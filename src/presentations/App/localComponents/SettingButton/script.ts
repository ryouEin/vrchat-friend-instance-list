import { Component, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { Setting } from '@/types'
import { settingModule } from '@/presentations/store/ModuleFactory'

@Component({})
export default class SettingButton extends Vue {
  dialogIsVisible = false

  get setting() {
    return settingModule.setting
  }

  @Watch('setting', { deep: true })
  onChangeSetting(newSetting: Setting) {
    settingModule.changeSetting(newSetting)
  }

  showDialog() {
    this.dialogIsVisible = true
  }

  hideDialog() {
    this.dialogIsVisible = false
  }
}
