import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { addErrorCallback } from '@/services/vrcApiService'
import { worldsModule } from '@/store/ModuleFactory'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'

@Component({
  components: {
    Dialog,
    Button,
  },
})
export default class App extends Vue {
  initialized = false
  showAuthErrorDialog = false

  reload() {
    location.reload()
  }

  // TODO: バージョン確認、及び新バージョンがある場合のダイアログ表示の実装
  checkVersion() {
    // 最新のバージョン情報をGitHubから取得
    // localStorageに確認したバージョン情報があるならそれでチェック
    // (localStorageには、versionHistoryJsonを埋め込む？)
    // ないなら、埋め込まれているバージョン情報を元にチェック
    // TSでjsonを読み込むのが難しそうなら通信で取るか？
    // 必要ならダイアログを表示
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

    this.checkVersion()

    this.$fullLoader.show()
    await worldsModule.init().finally(() => {
      this.$fullLoader.hide()
    })
    this.initialized = true
  }
}
