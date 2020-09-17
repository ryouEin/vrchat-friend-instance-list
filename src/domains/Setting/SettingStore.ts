import { ISettingRepository } from '@/infras/Setting/ISettingRepository'
import { computed, reactive } from '@vue/composition-api'
import { Setting } from '@/types'
import { DEFAULT_SETTING } from '@/config/settings'
import { Color, Theme } from '@/presentations/Colors'

type State = {
  setting: Setting
}
export const createSettingStore = (settingRepository: ISettingRepository) => {
  const state = reactive<State>({
    setting: DEFAULT_SETTING,
  })

  const setting = computed<Setting>(() => {
    return state.setting
  })

  const updateEnableNotificationSoundMutation = (isEnabled: boolean) => {
    state.setting.enableNotificationSound = isEnabled
  }

  const updateThemeMutation = (theme: Theme) => {
    state.setting.theme = theme
  }

  const updateMainColorMutation = (color: Color) => {
    state.setting.mainColor = color
  }

  const updateSettingMutation = (setting: Setting) => {
    state.setting = setting
  }

  const enableNotificationSoundAction = async () => {
    updateEnableNotificationSoundMutation(true)

    await settingRepository.updateSetting(state.setting)
  }

  const disableNotificationSoundAction = async () => {
    updateEnableNotificationSoundMutation(false)

    await settingRepository.updateSetting(state.setting)
  }

  const enableDarkModeAction = async () => {
    updateThemeMutation('dark')

    await settingRepository.updateSetting(state.setting)
  }

  const enableLightModeAction = async () => {
    updateThemeMutation('light')

    await settingRepository.updateSetting(state.setting)
  }

  const updateMainColorAction = async (color: Color) => {
    updateMainColorMutation(color)

    await settingRepository.updateSetting(state.setting)
  }

  const initAction = async () => {
    const repositorySetting = await settingRepository.getSetting()

    if (repositorySetting !== undefined) {
      /*
        Settingの項目を追加した際に、ユーザーの古いストレージのデータを
        そのまま反映してしまうと追加した項目の設定が消えてしまうので、
        マージをする
         */
      const setting = {
        ...state.setting,
        ...repositorySetting,
      }

      updateSettingMutation(setting)
    }
  }

  return {
    setting,
    enableNotificationSoundAction,
    disableNotificationSoundAction,
    enableDarkModeAction,
    enableLightModeAction,
    updateMainColorAction,
    initAction,
  }
}

export type SettingStore = ReturnType<typeof createSettingStore>
