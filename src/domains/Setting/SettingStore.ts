import { ISettingRepository } from '@/infras/Setting/ISettingRepository'
import { computed, reactive } from '@vue/composition-api'
import { Setting } from '@/types'
import { DEFAULT_SETTING } from '@/config/settings'
import { Color, Theme } from '@/presentations/Colors'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  setting: Setting
}
@MakeReferenceToWindowObjectInDevelopment('settingStore')
export class SettingStore {
  constructor(private readonly _settingRepository: ISettingRepository) {}

  private readonly _state = reactive<State>({
    setting: DEFAULT_SETTING,
  })

  readonly setting = computed<Setting>(() => {
    return this._state.setting
  })

  @LogBeforeAfter('_state')
  private updateEnableNotificationSoundMutation(isEnabled: boolean) {
    this._state.setting.enableNotificationSound = isEnabled
  }

  @LogBeforeAfter('_state')
  private updateThemeMutation(theme: Theme) {
    this._state.setting.theme = theme
  }

  @LogBeforeAfter('_state')
  private updateMainColorMutation(color: Color) {
    this._state.setting.mainColor = color
  }

  @LogBeforeAfter('_state')
  private updateSettingMutation(setting: Setting) {
    this._state.setting = setting
  }

  async enableNotificationSoundAction() {
    this.updateEnableNotificationSoundMutation(true)

    await this._settingRepository.updateSetting(this._state.setting)
  }

  async disableNotificationSoundAction() {
    this.updateEnableNotificationSoundMutation(false)

    await this._settingRepository.updateSetting(this._state.setting)
  }

  async enableDarkModeAction() {
    this.updateThemeMutation('dark')

    await this._settingRepository.updateSetting(this._state.setting)
  }

  async enableLightModeAction() {
    this.updateThemeMutation('light')

    await this._settingRepository.updateSetting(this._state.setting)
  }

  async updateMainColorAction(color: Color) {
    this.updateMainColorMutation(color)

    await this._settingRepository.updateSetting(this._state.setting)
  }

  async initAction() {
    const repositorySetting = await this._settingRepository.getSetting()

    if (repositorySetting !== undefined) {
      /*
          Settingの項目を追加した際に、ユーザーの古いストレージのデータを
          そのまま反映してしまうと追加した項目の設定が消えてしまうので、
          マージをする
           */
      const setting = {
        ...this._state.setting,
        ...repositorySetting,
      }

      this.updateSettingMutation(setting)
    }
  }
}
