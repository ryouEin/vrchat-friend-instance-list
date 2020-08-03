import { Component, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { Setting } from '@/types'

@Component({})
export default class SettingButton extends Vue {
  dialogIsVisible = false

  // TODO: ストアからgetters経由で取得
  setting: Setting = {
    enableNotificationSound: true,
  }

  @Watch('setting', { deep: true })
  onChangeSetting(value: Setting) {
    // TODO: ストアへのデータ反映
    console.log(value)
  }

  showDialog() {
    this.dialogIsVisible = true
  }

  hideDialog() {
    this.dialogIsVisible = false
  }
}
