import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import MicroCmsApiNewsRepository from '@/infras/News/MicroCmsApiNewsRepository'
import { KeyValueStorageNewsLastCheckRepository } from '@/infras/News/KeyValueStorageNewsLastCheckRepository'
import NotificationButton from '@/presentations/App/localComponents/NotificationButton/index.vue'
import { News } from '@/types'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import Menu from '@/presentations/App/localComponents/Menu/index.vue'
import { UAParser } from 'ua-parser-js'
import { fetchUnreadNews } from '@/domains/News/NewsService'
import { Network } from '@/libs/Network/Network'
import { MicroCmsApi } from '@/libs/MicroCmsApi/MicroCmsApi'
import Toasts from '@/presentations/App/localComponents/Toasts/index.vue'
import FullLoader from '@/presentations/App/localComponents/FullLoader/index.vue'
import Alert from '@/presentations/App/localComponents/Alert/index.vue'
import { errorTracker } from '@/libs/errorTracker'
import { SEND_ERROR_LOG } from '@/config/env'

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
    // TODO: Presentation層でInfraのインスタンス生成してるのは微妙では？
    const newsApi = new MicroCmsApi(new Network())
    const newsRepository = new MicroCmsApiNewsRepository(newsApi)
    const newsStorage = new KeyValueStorageNewsLastCheckRepository()
    const newsArray = await fetchUnreadNews(newsRepository, newsStorage)

    this.showNewsDialogs(newsArray)
  }

  startCheckWatchingInstances() {
    setInterval(async () => {
      await this.$store.instancesStore.checkWatchingInstancesAction()
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

  // どこでも拾われなかった例外を処理する関数
  errorHandler(error: unknown) {
    if (SEND_ERROR_LOG) errorTracker.sendErrorLog(error)
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

    this.$store.fullLoaderStore.showAction()
    await this.$store.settingStore.initAction()
    await this.$store.worldsStore.initAction().finally(() => {
      this.$store.fullLoaderStore.hideAction()
    })

    this.initialized = true

    this.startCheckWatchingInstances()

    await this.checkNews()
  }
}
