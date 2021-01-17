import { Setting } from '@/types'
import { DEFAULT_SETTING } from '@/config/settings'
import { ISettingRepository } from '@/infras/Setting/ISettingRepository'
import VueCompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { SettingStore } from '@/domains/Setting/SettingStore'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

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

    expect(settingStore.setting.value).toBe(DEFAULT_SETTING)
  })

  it('リポジトリに設定がある場合は、リポジトリの内容が適用される', async () => {
    const repositorySetting: Setting = {
      enableNotificationSound: false,
      theme: 'dark',
      mainColor: 'blue',
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()

    expect(settingStore.setting.value).toEqual(repositorySetting)
  })
})

describe('enableNotificationSoundAction', () => {
  it('isEnabledNotificationSoundがtrueになり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      enableNotificationSound: false,
      theme: 'dark',
      mainColor: 'blue',
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.enableNotificationSoundAction()

    expect(settingStore.setting.value.enableNotificationSound).toBe(true)
    expect(mockSettingRepository.setting?.enableNotificationSound).toBe(true)
  })
})

describe('disableNotificationSoundAction', () => {
  it('isEnabledNotificationSoundがfalseになり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      enableNotificationSound: true,
      theme: 'dark',
      mainColor: 'blue',
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.disableNotificationSoundAction()

    expect(settingStore.setting.value.enableNotificationSound).toBe(false)
    expect(mockSettingRepository.setting?.enableNotificationSound).toBe(false)
  })
})

describe('enableDarkModeAction', () => {
  it('themeがdarkになり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      enableNotificationSound: true,
      theme: 'light',
      mainColor: 'blue',
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.enableDarkModeAction()

    expect(settingStore.setting.value.theme).toBe('dark')
    expect(mockSettingRepository.setting?.theme).toBe('dark')
  })
})

describe('enableLightModeAction', () => {
  it('themeがlightになり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      enableNotificationSound: true,
      theme: 'dark',
      mainColor: 'blue',
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.enableLightModeAction()

    expect(settingStore.setting.value.theme).toBe('light')
    expect(mockSettingRepository.setting?.theme).toBe('light')
  })
})

describe('updateMainColorAction', () => {
  it('mainColorが指定された色になり、リポジトリにもその内容が保存される', async () => {
    const repositorySetting: Setting = {
      enableNotificationSound: true,
      theme: 'dark',
      mainColor: 'blue',
    }
    const mockSettingRepository = new MockSettingRepository(repositorySetting)
    const settingStore = new SettingStore(mockSettingRepository)

    await settingStore.initAction()
    await settingStore.updateMainColorAction('red')

    expect(settingStore.setting.value.mainColor).toBe('red')
    expect(mockSettingRepository.setting?.mainColor).toBe('red')
  })
})
