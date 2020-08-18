import { ISettingRepository } from '@/infras/Setting/ISettingRepository'
import { Setting } from '@/types'
import IStorage from '@/libs/Storage/IStorage'

const SETTING_STORAGE_KEY = 'setting'

export class KeyValueStorageSettingRepository implements ISettingRepository {
  constructor(private _storage: IStorage) {}

  async getSetting(): Promise<Setting | undefined> {
    // TODO SOON: ストレージに保存されている形式が古かったり、おかしくなっている場合の対処が必要
    //   io-tsで実行時型チェックできそう
    const settingJson = this._storage.getItem(SETTING_STORAGE_KEY)
    if (settingJson === undefined) return undefined

    return JSON.parse(settingJson)
  }

  async updateSetting(setting: Setting): Promise<void> {
    this._storage.setItem(SETTING_STORAGE_KEY, JSON.stringify(setting))
  }
}
