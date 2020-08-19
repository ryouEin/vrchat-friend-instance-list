import { Setting } from '@/types'

export interface ISettingRepository {
  getSetting(): Promise<Setting | undefined>

  updateSetting(setting: Setting): Promise<void>
}
