import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { Setting } from '@/types'
import { settingModule } from '@/store/ModuleFactory'

@Component({})
export default class Menu extends Vue {
  isVisibleSettingDialog = false
  isVisibleAboutCapacityDialog = false
  isVisibleAuthorDialog = false

  @Prop()
  value!: boolean

  get setting() {
    return settingModule.setting
  }

  @Watch('setting', { deep: true })
  onChangeSetting(newSetting: Setting) {
    settingModule.changeSetting(newSetting)
  }

  showSettingDialog() {
    this.isVisibleSettingDialog = true
  }

  hideSettingDialog() {
    this.isVisibleSettingDialog = false
  }

  showAboutCapacityDialog() {
    this.isVisibleAboutCapacityDialog = true
  }

  hideAboutCapacityDialog() {
    this.isVisibleAboutCapacityDialog = false
  }

  showAuthorDialog() {
    this.isVisibleAuthorDialog = true
  }

  hideAuthorDialog() {
    this.isVisibleAuthorDialog = false
  }

  hideMenu() {
    this.$emit('input', false)
  }
}
