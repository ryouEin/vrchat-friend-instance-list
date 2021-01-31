import { Setting } from '../../presentations/types'

export interface ISettingRepository {
  getSetting(): Promise<Setting | undefined>

  updateSetting(setting: Setting): Promise<void>
}
