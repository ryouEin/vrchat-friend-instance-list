import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import MicroCmsApiNewsRepository from '@/infras/News/MicroCmsApiNewsRepository'
import { KeyValueStorageNewsLastCheckRepository } from '@/infras/News/KeyValueStorageNewsLastCheckRepository'
import NotificationButton from '@/presentations/App/localComponents/NotificationButton/index.vue'
import { News } from '@/types'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import Menu from '@/presentations/App/localComponents/Menu/index.vue'
import { UAParser } from 'ua-parser-js'
import {
  instancesStore,
  settingStore,
  worldsStore,
} from '@/domains/DomainStoreFactory'
import { fetchUnreadNews } from '@/domains/News/NewsService'
import { Network } from '@/libs/Network/Network'
import { VRChatApiUnauthorizedError } from '@/libs/VRChatApi/VRChatApi'
import { MicroCmsApi } from '@/libs/MicroCmsApi/MicroCmsApi'
import { getRGB } from '@/presentations/Colors'

@Component({
  components: {
    NotificationButton,
    Menu,
  },
})
export default class App extends Vue {
  initialized = false
  showAuthErrorDialog = false
  isVisibleMenu = false
  isPC = false

  rootStyle = {
    '--blackColor': getRGB('black'),
    '--greenColor': getRGB('green'),
    '--blueColor': getRGB('blue'),
    '--redColor': getRGB('red'),
    '--yellowColor': getRGB('yellow'),
    '--orangeColor': getRGB('orange'),
    '--grayColor': getRGB('gray'),
    '--paleGrayColor': getRGB('paleGray'),
    '--whiteColor': getRGB('white'),
  }

  reload() {
    location.reload()
  }

  showMenu() {
    this.isVisibleMenu = true
  }

  hideMenu() {
    this.isVisibleMenu = false
  }

  showNewsDialogs(newsArray: News[]) {
    const remainingNewsArray = [...newsArray]
    const displayNews = remainingNewsArray.pop()

    if (displayNews === undefined) return

    this.$alert({
      title: displayNews.title,
      content: displayNews.content,
      isMarkdown: true,
      onClose: () => {
        this.showNewsDialogs(remainingNewsArray)
      },
    })
  }

  async checkNews() {
    // TODO: Presentation層でInfraのインスタンス生成してるのは微妙では？
    const newsApi = new MicroCmsApi(new Network())
    const newsRepository = new MicroCmsApiNewsRepository(newsApi)
    const newsStorage = new KeyValueStorageNewsLastCheckRepository()
    const newsArray = await fetchUnreadNews(newsRepository, newsStorage)

    this.showNewsDialogs(newsArray)
  }

  startCheckWatchingInstances() {
    setInterval(async () => {
      await instancesStore.checkWatchingInstancesAction()
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

  errorHandler(error: unknown) {
    if (error instanceof VRChatApiUnauthorizedError) {
      this.showAuthErrorDialog = true
      return
    }

    throw error
  }

  setupErrorHandlers() {
    // 全てのエラーをキャプチャするには以下の3パターン登録する必要がある
    // https://qiita.com/clomie/items/73fa1e9f61e5b88826bc
    Vue.config.errorHandler = this.errorHandler
    window.addEventListener('error', this.errorHandler)
    window.addEventListener('unhandledrejection', this.errorHandler)
  }

  async created() {
    this.setupErrorHandlers()

    this.judgeDevice()

    this.$fullLoader.show()
    await settingStore.initAction()
    await worldsStore.initAction().finally(() => {
      this.$fullLoader.hide()
    })

    this.initialized = true

    this.startCheckWatchingInstances()

    await this.checkNews()
  }
}
