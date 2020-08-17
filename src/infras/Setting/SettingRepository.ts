import { ISettingRepository } from '@/infras/Setting/ISettingRepository'
import { Setting } from '@/types'
import { ISettingStorage } from '@/infras/Setting/Storage/ISettingStorage'

export class SettingRepository implements ISettingRepository {
  constructor(private readonly _settingStorage: ISettingStorage) {}

  async getSetting(): Promise<Setting | undefined> {
    return await this._settingStorage.getSetting()
  }

  async updateSetting(setting: Setting): Promise<void> {
    await this._settingStorage.updateSetting(setting)
  }
}
