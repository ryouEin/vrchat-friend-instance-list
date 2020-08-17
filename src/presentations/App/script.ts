import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import NewsApi from '@/infras/News/Api/NewsApi'
import { NewsStorage } from '@/infras/News/Storage/NewsStorage'
import { NewsRepository } from '@/infras/News/NewsRepository'
import NotificationButton from '@/presentations/App/localComponents/NotificationButton/index.vue'
import { News } from '@/types'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import Menu from '@/presentations/App/localComponents/Menu/index.vue'
import { UAParser } from 'ua-parser-js'
import settingStore from '@/store/data/SettingStore'
import worldsStore from '@/store/data/WorldsStore'
import instancesStore from '@/store/data/InstancesStore'

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
    // TODO SOON: Presentation層でRepositoryインスタンスの作成の知識が必要なのはおかしいのでは？
    const newsApi = new NewsApi()
    const newsStorage = new NewsStorage()
    const newsRepository = new NewsRepository(newsApi, newsStorage)
    const newsArray = await newsRepository.fetchUnreadNews()

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

  async created() {
    // TODO SOON: APIコールに対して401が帰ってきた場合の処理考え直す
    // addErrorCallback(status => {
    //   if (status === 401) {
    //     this.showAuthErrorDialog = true
    //   } else {
    //     this.$alert({
    //       title: `エラー [${status}]`,
    //       content:
    //         'データの取得に失敗しました。しばらく時間をおいてからやり直してください。',
    //     })
    //   }
    // })

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
