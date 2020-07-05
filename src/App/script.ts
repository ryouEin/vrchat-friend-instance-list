import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { addErrorCallback } from '@/infras/network/vrcApi'
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
  }
}
