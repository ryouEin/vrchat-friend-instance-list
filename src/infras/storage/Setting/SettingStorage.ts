import IStorage from '@/libs/Storage/IStorage'
import { Setting } from '@/types'

const SETTING_STORAGE_KEY = 'setting'

// TODO: 初期設定は別の所に書きたい
const defaultSetting: Setting = {
  enableNotificationSound: true,
}

export class SettingStorage {
  constructor(private _storage: IStorage) {}

  getSetting(): Setting {
    const settingJson = this._storage.getItem(SETTING_STORAGE_KEY)
    if (settingJson === undefined) return defaultSetting

    return JSON.parse(settingJson)
  }

  updateSetting(setting: Setting) {
    this._storage.setItem(SETTING_STORAGE_KEY, JSON.stringify(setting))
  }
}
