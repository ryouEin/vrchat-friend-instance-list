import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { addErrorCallback } from '@/infras/network/vrcApi'
import {
  instancesModule,
  settingModule,
  worldsModule,
} from '@/presentations/store/ModuleFactory'
import NewsApi from '@/infras/network/News/NewsApi'
import { NewsStorage } from '@/infras/storage/News/NewsStorage'
import { NewsApplicationService } from '@/applications/NewsApplicationService'
import NotificationButton from '@/presentations/App/localComponents/NotificationButton/index.vue'
import AboutCapacity from '@/presentations/App/localComponents/AboutCapacity/index.vue'
import { News } from '@/types'
import SettingButton from '@/presentations/App/localComponents/SettingButton/index.vue'
import { INSTANCE_WATCH_INTERVAL } from '@/config/settings'

@Component({
  components: {
    NotificationButton,
    SettingButton,
    AboutCapacity,
  },
})
export default class App extends Vue {
  initialized = false
  showAuthErrorDialog = false

  reload() {
    location.reload()
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
    // TODO SOON: interval時間をconfigから取得
    setInterval(async () => {
      await instancesModule.checkWatchingInstances()
    }, 10 * 1000)
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
