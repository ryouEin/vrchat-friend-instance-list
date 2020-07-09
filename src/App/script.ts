import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { addErrorCallback } from '@/infras/network/vrcApi'
import { worldsModule } from '@/store/ModuleFactory'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'
import NewsApi from '@/infras/network/News/NewsApi'
import { NewsStorage } from '@/infras/storage/News/NewsStorage'
import { NewsService } from '@/domains/News/NewsService'
import Icon from '@/components/Icon/index.vue'
import NotificationButton from '@/App/localComponents/NotificationButton/index.vue'
import AboutCapacity from '@/App/localComponents/AboutCapacity/index.vue'
import { News } from '@/types'

@Component({
  components: {
    Dialog,
    Button,
    Icon,
    NotificationButton,
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
    const newsService = new NewsService(newsApi, newsStorage)
    const newsArray = await newsService.getNews()

    this.showNewsDialogs(newsArray)
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
    await worldsModule.init().finally(() => {
      this.$fullLoader.hide()
    })

    this.initialized = true

    await this.checkNews()
  }
}
