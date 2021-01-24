import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import NotificationButton from '@/presentations/App/localComponents/NotificationButton/index.vue'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import Menu from '@/presentations/App/localComponents/Menu/index.vue'
import { UAParser } from 'ua-parser-js'
import Toasts from '@/presentations/App/localComponents/Toasts/index.vue'
import FullLoader from '@/presentations/App/localComponents/FullLoader/index.vue'
import Alert from '@/presentations/App/localComponents/Alert/index.vue'
import { VRChatApiUnauthorizedError } from '@/libs/VRChatApi/VRChatApi'
import { showAuthorizationErrorDialog } from '@/presentations/ErrorDialogManager'
import { unhandledErrorHandler } from '@/libs/unhandledErrorHandler'
import { instancesRepository, newsRepository } from '@/singletonFactory'
import { News } from '@/presentations/types'

@Component({
  components: {
    NotificationButton,
    Menu,
    Toasts,
    FullLoader,
    Alert,
  },
})
export default class App extends Vue {
  initialized = false
  isVisibleMenu = false
  isPC = false

  get rootStyle() {
    return {
      '--blackColor': this.$colorManager.getRGB('black'),
      '--paleBlackColor': this.$colorManager.getRGB('paleBlack'),
      '--trueBlackColor': this.$colorManager.getRGB('trueBlack'),
      '--greenColor': this.$colorManager.getRGB('green'),
      '--blueColor': this.$colorManager.getRGB('blue'),
      '--redColor': this.$colorManager.getRGB('red'),
      '--yellowColor': this.$colorManager.getRGB('yellow'),
      '--orangeColor': this.$colorManager.getRGB('orange'),
      '--grayColor': this.$colorManager.getRGB('gray'),
      '--paleGrayColor': this.$colorManager.getRGB('paleGray'),
      '--whiteColor': this.$colorManager.getRGB('white'),
      '--frontColor': this.$colorManager.getRGB('front'),
      '--weakFrontColor': this.$colorManager.getRGB('weakFront'),
      '--backColor': this.$colorManager.getRGB('back'),
      '--weakBackColor': this.$colorManager.getRGB('weakBack'),
      '--mainColor': this.$colorManager.getRGB('main'),
    }
  }

  reload() {
    location.reload()
  }

  showMenu() {
    this.isVisibleMenu = true
  }

  async showNewsDialogs(newsArray: News[]) {
    ;[...newsArray].reverse().forEach(news => {
      this.$store.alertStore.showAction({
        title: news.title,
        content: news.content,
        isMarkdown: true,
      })
    })
  }

  async checkNews() {
    const newsArray = await newsRepository.fetchUnreadNews()

    this.showNewsDialogs(newsArray)
  }

  startCheckWatchingInstances() {
    setInterval(async () => {
      const checkFreeSpace = async (
        instanceId: string,
        notifyFreeSpaceNum: number
      ) => {
        // TODO: ここらへん整理
        const apiResponse = await instancesRepository.fetchInstance(instanceId)
        await this.$store.instanceUserNumsStore.addAction({
          instanceId,
          userNum: apiResponse.n_users,
        })
        const hardCapacity =
          apiResponse.capacity === 1 ? 1 : apiResponse.capacity * 2
        const freeSpaceNum = hardCapacity - apiResponse.n_users
        if (freeSpaceNum >= notifyFreeSpaceNum) {
          await this.$store.notificationsStore.pushNotificationAction({
            // TODO: ワールド名入れたい
            text: 'インスタンスに空きが出来ました。',
            date: Date.now(),
            onClick: () => {
              this.$router.push({
                name: 'Instance',
                params: { location: instanceId },
              })
            },
          })
          await this.$store.watchingInstancesStore.deleteAction(instanceId)
        }
      }

      const watchingInstances = this.$store.watchingInstancesStore
        .watchingInstances.value
      await Promise.all(
        watchingInstances.map(watchingInstance =>
          checkFreeSpace(
            watchingInstance.instanceId,
            watchingInstance.notifyFreeSpaceNum
          )
        )
      )
    }, INSTANCE_WATCH_INTERVAL)
  }

  judgeDevice() {
    const parser = new UAParser()
    const device = parser.getDevice()
    if (device.type !== 'mobile') {
      this.isPC = true
    }
  }

  // TODO: id経由でアクセスしているが、もっといい方法がないか…
  scrollTopInstanceList() {
    const instanceListElement = document.getElementById('InstanceList')
    if (instanceListElement === null) {
      throw new Error('Element has id "InstanceList" is not found.')
    }

    instanceListElement.scrollTo(0, 0)
  }

  setupUnhandledErrorHandler() {
    unhandledErrorHandler.setOnErrorCallback(error => {
      if (error instanceof VRChatApiUnauthorizedError) {
        showAuthorizationErrorDialog(this.$store.alertStore)

        return null
      }

      return error
    })
  }

  async created() {
    this.setupUnhandledErrorHandler()

    this.judgeDevice()

    await this.$store.fullLoaderStore.showAction()
    await this.$store.settingStore.initAction().finally(() => {
      this.$store.fullLoaderStore.hideAction()
    })

    this.initialized = true

    this.startCheckWatchingInstances()

    await this.checkNews()
  }
}
