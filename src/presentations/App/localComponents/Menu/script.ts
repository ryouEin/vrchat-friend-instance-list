import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import settingStore from '@/store/data/SettingStore'

@Component({})
export default class Menu extends Vue {
  isVisibleSettingDialog = false
  isVisibleAboutCapacityDialog = false
  isVisibleAuthorDialog = false

  @Prop()
  value!: boolean

  get setting() {
    return settingStore.setting
  }

  async onChangeEnableNotificationSound(isEnabled: boolean) {
    if (isEnabled) {
      await settingStore.enableNotificationSoundAction()
    } else {
      await settingStore.disableNotificationSoundAction()
    }
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
