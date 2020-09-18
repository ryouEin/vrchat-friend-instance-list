import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Color } from '@/presentations/Colors'

@Component({})
export default class SettingDialog extends Vue {
  @Prop()
  value!: boolean

  get setting() {
    return this.$store.settingStore.setting.value
  }

  async onChangeEnableNotificationSound(isEnabled: boolean) {
    if (isEnabled) {
      await this.$store.settingStore.enableNotificationSoundAction()
    } else {
      await this.$store.settingStore.disableNotificationSoundAction()
    }
  }

  async onChangeDarkMode(isEnabled: boolean) {
    if (isEnabled) {
      await this.$store.settingStore.enableDarkModeAction()
    } else {
      await this.$store.settingStore.enableLightModeAction()
    }
  }

  async onChangeMainColor(color: Color) {
    await this.$store.settingStore.updateMainColorAction(color)
  }

  hideSettingDialog() {
    this.$emit('close')
  }
}
