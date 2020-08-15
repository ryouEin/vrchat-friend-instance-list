import { ISettingStorage } from '@/infras/storage/Setting/ISettingStorage'
import { Setting } from '@/types'
import { SettingStore } from '@/store/module/SettingStore'
import { DEFAULT_SETTING } from '@/config/settings'

class MockSettingStorage implements ISettingStorage {
  constructor(public setting: Setting | undefined) {}

  async getSetting(): Promise<Setting | undefined> {
    return this.setting
  }

  async updateSetting(setting: Setting): Promise<void> {
    this.setting = setting
  }
}

describe('initAction', () => {
  it('ストレージに設定がない場合は、初期設定が使用される', async () => {
    const mockSettingStorage = new MockSettingStorage(undefined)
    const settingStore = new SettingStore(mockSettingStorage)

    await settingStore.initAction()

    expect(settingStore.setting).toBe(DEFAULT_SETTING)
  })

  it('ストレージに設定がある場合は、ストレージの内容が適用される', async () => {
    const storageSetting: Setting = {
      isEnabledNotificationSound: false,
    }
    const mockSettingStorage = new MockSettingStorage(storageSetting)
    const settingStore = new SettingStore(mockSettingStorage)

    await settingStore.initAction()

    expect(settingStore.setting).toEqual(storageSetting)
  })
})

describe('enableNotificationSoundAction', () => {
  it('isEnabledNotificationSoundがtrueになり、ストレージにもその内容が保存される', async () => {
    const storageSetting: Setting = {
      isEnabledNotificationSound: false,
    }
    const mockSettingStorage = new MockSettingStorage(storageSetting)
    const settingStore = new SettingStore(mockSettingStorage)

    await settingStore.initAction()
    await settingStore.enableNotificationSoundAction()

    expect(settingStore.setting.isEnabledNotificationSound).toBe(true)
    expect(mockSettingStorage.setting?.isEnabledNotificationSound).toBe(true)
  })
})

describe('disableNotificationSoundAction', () => {
  it('isEnabledNotificationSoundがfalseになり、ストレージにもその内容が保存される', async () => {
    const storageSetting: Setting = {
      isEnabledNotificationSound: true,
    }
    const mockSettingStorage = new MockSettingStorage(storageSetting)
    const settingStore = new SettingStore(mockSettingStorage)

    await settingStore.initAction()
    await settingStore.disableNotificationSoundAction()

    expect(settingStore.setting.isEnabledNotificationSound).toBe(false)
    expect(mockSettingStorage.setting?.isEnabledNotificationSound).toBe(false)
  })
})
