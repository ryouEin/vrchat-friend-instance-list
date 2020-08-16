import Vue from 'vue'
import { Setting } from '@/types'
import { SettingStorage } from '@/infras/storage/Setting/SettingStorage'
import Storage from '@/libs/Storage/Storage'
import { ISettingStorage } from '@/infras/storage/Setting/ISettingStorage'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { DEFAULT_SETTING } from '@/config/settings'

type State = {
  setting: Setting
}
@MakeReferenceToWindowObjectInDevelopment('settingStore')
export class SettingStore {
  private _state = Vue.observable<State>({
    setting: DEFAULT_SETTING,
  })

  constructor(private readonly _settingStorage: ISettingStorage) {}

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

    await this._settingStorage.updateSetting(this.setting)
  }

  async disableNotificationSoundAction() {
    this.updateEnableNotificationSoundMutation(false)

    await this._settingStorage.updateSetting(this.setting)
  }

  async initAction() {
    const setting = await this._settingStorage.getSetting()
    if (setting !== undefined) {
      await this.updateSettingMutation(setting)
    }
  }
}

const storage = new Storage()
const settingStorage = new SettingStorage(storage)
const settingStore = new SettingStore(settingStorage)

export default settingStore
