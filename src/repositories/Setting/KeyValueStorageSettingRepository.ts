import { ISettingRepository } from './ISettingRepository'
import { IKeyValueStorage } from '../../libs/Storage/IKeyValueStorage'
import { Setting } from '../../presentations/types'

const SETTING_STORAGE_KEY = 'setting'

export class KeyValueStorageSettingRepository implements ISettingRepository {
  constructor(private _storage: IKeyValueStorage) {}

  async getSetting(): Promise<Setting | undefined> {
    const settingJson = this._storage.getItem(SETTING_STORAGE_KEY)
    if (settingJson === undefined) return undefined

    // TODO: JSONの型チェック
    return JSON.parse(settingJson)
  }

  async updateSetting(setting: Setting): Promise<void> {
    this._storage.setItem(SETTING_STORAGE_KEY, JSON.stringify(setting))
  }
}
