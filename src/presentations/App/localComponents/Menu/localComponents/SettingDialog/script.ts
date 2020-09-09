import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { settingStore } from '@/domains/DomainStoreFactory'
import { Color } from '@/presentations/Colors'

@Component({})
export default class SettingDialog extends Vue {
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

  async onChangeDarkMode(isEnabled: boolean) {
    if (isEnabled) {
      await settingStore.enableDarkModeAction()
    } else {
      await settingStore.enableLightModeAction()
    }
  }

  async onChangeMainColor(color: Color) {
    await settingStore.updateMainColorAction(color)
  }

  hideSettingDialog() {
    this.$emit('close')
  }
}
