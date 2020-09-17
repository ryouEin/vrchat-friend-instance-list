import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'

@Component({})
export default class SettingDialog extends Vue {
  @Prop()
  value!: boolean

  get setting() {
    return this.$domainStore.settingStore.setting.value
  }

  async onChangeEnableNotificationSound(isEnabled: boolean) {
    if (isEnabled) {
      await this.$domainStore.settingStore.enableNotificationSoundAction()
    } else {
      await this.$domainStore.settingStore.disableNotificationSoundAction()
    }
  }

  async onChangeDarkMode(isEnabled: boolean) {
    if (isEnabled) {
      await this.$domainStore.settingStore.enableDarkModeAction()
    } else {
      await this.$domainStore.settingStore.enableLightModeAction()
    }
  }

  async onChangeMainColor(color: Color) {
    await this.$domainStore.settingStore.updateMainColorAction(color)
  }

  hideSettingDialog() {
    this.$emit('close')
  }
}
