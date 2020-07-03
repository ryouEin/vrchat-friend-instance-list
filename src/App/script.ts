import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { addErrorCallback } from '@/infras/network/vrcApi'
import { worldsModule } from '@/store/ModuleFactory'
import Dialog from '@/components/Dialog/index.vue'
import Button from '@/components/Button/index.vue'
import {
  fetchCurrentVersionHistory,
  fetchNewestVersionHistory,
} from '@/infras/network/fetchVersionHistory'
import { VersionHistoryService } from '@/domains/VersionHistory/VersionHistoryService'
import { VersionHistoryStorage } from '@/infras/storage/VersionHistoryStorage'

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

  // TODO: バージョンチェックの処理、E2Eで自動テストできるようにする（手動テストがめんどくさいのでそのうち絶対に不具合発生しているのに気づかずスルーする）
  async checkVersion() {
    const storageVersionHistoryJson = VersionHistoryStorage.get()
    const localVersionHistoryJson = await fetchCurrentVersionHistory()

    const currentVersionHistoryJson =
      storageVersionHistoryJson === undefined ||
      VersionHistoryService.versionHistoryJsonAIsNewerThanB(
        localVersionHistoryJson,
        storageVersionHistoryJson
      )
        ? localVersionHistoryJson
        : storageVersionHistoryJson
    const newestVersionHistoryJson = await fetchNewestVersionHistory()

    const hasUpdate = VersionHistoryService.versionHistoryJsonAIsNewerThanB(
      newestVersionHistoryJson,
      currentVersionHistoryJson
    )

    if (hasUpdate) {
      const newestVersionInfo = VersionHistoryService.getNewestVersionInfoJson(
        newestVersionHistoryJson
      )
      this.$alert({
        title: '新しいバージョンが配布されています',
        content: ['「更新内容」', ...newestVersionInfo.contents],
        onClose() {
          VersionHistoryStorage.set(newestVersionHistoryJson)
        },
      })
    }
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

      this.checkVersion()
    })
    this.initialized = true
  }
}
