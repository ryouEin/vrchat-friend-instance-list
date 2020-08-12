import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { addErrorCallback } from '@/infras/network/vrcApi'
import {
  instancesModule,
  settingModule,
  worldsModule,
} from '@/store/ModuleFactory'
import NewsApi from '@/infras/network/News/NewsApi'
import { NewsStorage } from '@/infras/storage/News/NewsStorage'
import { NewsApplicationService } from '@/applications/NewsApplicationService'
import NotificationButton from '@/presentations/App/localComponents/NotificationButton/index.vue'
import { News } from '@/types'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'
import Menu from '@/presentations/App/localComponents/Menu/index.vue'
import { isPcDevice } from '@/shame/isPcDevice'

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

  get isPC() {
    return isPcDevice
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
    const newsApi = new NewsApi()
    const newsStorage = new NewsStorage()
    const newsService = new NewsApplicationService(newsApi, newsStorage)
    const newsArray = await newsService.getNews()

    this.showNewsDialogs(newsArray)
  }

  startCheckWatchingInstances() {
    setInterval(async () => {
      await instancesModule.checkWatchingInstances()
    }, INSTANCE_WATCH_INTERVAL)
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
    addErrorCallback(status => {
      if (status === 401) {
        this.showAuthErrorDialog = true
      } else {
        this.$alert({
          title: `エラー [${status}]`,
          content:
            'データの取得に失敗しました。しばらく時間をおいてからやり直してください。',
        })
      }
    })

    this.$fullLoader.show()
    settingModule.init()
    await worldsModule.init().finally(() => {
      this.$fullLoader.hide()
    })

    this.initialized = true

    this.startCheckWatchingInstances()

    await this.checkNews()
  }
}
