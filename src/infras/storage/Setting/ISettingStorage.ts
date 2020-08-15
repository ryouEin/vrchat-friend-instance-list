import { Setting } from '@/types'

export interface ISettingStorage {
  getSetting(): Promise<Setting | undefined>
  updateSetting(setting: Setting): Promise<void>
}
