import Vue from 'vue'
import { Setting } from '@/types'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { DEFAULT_SETTING } from '@/config/settings'
import { ISettingRepository } from '@/infras/Setting/ISettingRepository'

type State = {
  setting: Setting
}
@MakeReferenceToWindowObjectInDevelopment('settingStore')
export class SettingStore {
  private _state = Vue.observable<State>({
    setting: DEFAULT_SETTING,
  })

  constructor(private readonly _settingRepository: ISettingRepository) {}

  get setting() {
    return this._state.setting
  }

  @LogBeforeAfter('_state')
  private updateEnableNotificationSoundMutation(isEnabled: boolean) {
    this._state.setting.isEnabledNotificationSound = isEnabled
  }

  @LogBeforeAfter('_state')
  private updateSettingMutation(setting: Setting) {
    this._state.setting = setting
  }

  async enableNotificationSoundAction() {
    this.updateEnableNotificationSoundMutation(true)

    await this._settingRepository.updateSetting(this.setting)
  }

  async disableNotificationSoundAction() {
    this.updateEnableNotificationSoundMutation(false)

    await this._settingRepository.updateSetting(this.setting)
  }

  async initAction() {
    const setting = await this._settingRepository.getSetting()
    if (setting !== undefined) {
      await this.updateSettingMutation(setting)
    }
  }
}