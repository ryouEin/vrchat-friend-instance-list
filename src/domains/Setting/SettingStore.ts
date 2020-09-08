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
    this._state.setting.enableNotificationSound = isEnabled
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
    const repositorySetting = await this._settingRepository.getSetting()

    if (repositorySetting !== undefined) {
      /*
      Settingの項目を追加した際に、ユーザーの古いストレージのデータを
      そのまま反映してしまうと追加した項目の設定が消えてしまうので、
      マージをする
       */
      const setting = {
        ...this.setting,
        ...repositorySetting,
      }

      await this.updateSettingMutation(setting)
    }
  }
}
