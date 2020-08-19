import { Setting } from '@/types'
import { SettingStore } from '@/domains/Setting/SettingStore'
import { DEFAULT_SETTING } from '@/config/settings'
import { ISettingRepository } from '@/infras/Setting/ISettingRepository'

class MockSettingRepository implements ISettingRepository {
  constructor(public setting: Setting | undefined = undefined) {}

  async getSetting(): Promise<Setting | undefined> {
    return this.setting
  }

  async updateSetting(setting: Setting): Promise<void> {
    this.setting = setting
  }
}

describe('initAction', () => {
  it('リポジトリに設定がない場合は、初期設定が使用される', async () => {
    const mockSettingRepository = new MockSettingRepository()
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()

    expect(settingStore.setting).toBe(DEFAULT_SETTING)
  })

  it('リポジトリに設定がある場合は、リポジトリの内容が適用される', async () => {
    const repositorySetting: Setting = {
      isEnabledNotificationSound: false,
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()

    expect(settingStore.setting).toEqual(repositorySetting)
  })
})

describe('enableNotificationSoundAction', () => {
  it('isEnabledNotificationSoundがtrueになり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      isEnabledNotificationSound: false,
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.enableNotificationSoundAction()

    expect(settingStore.setting.isEnabledNotificationSound).toBe(true)
    expect(mockSettingRepository.setting?.isEnabledNotificationSound).toBe(true)
  })
})

describe('disableNotificationSoundAction', () => {
  it('isEnabledNotificationSoundがfalseになり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      isEnabledNotificationSound: true,
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.disableNotificationSoundAction()

    expect(settingStore.setting.isEnabledNotificationSound).toBe(false)
    expect(mockSettingRepository.setting?.isEnabledNotificationSound).toBe(
      false
    )
  })
})
