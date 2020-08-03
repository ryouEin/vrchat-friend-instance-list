import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Setting } from '@/types'
import { SettingStorage } from '@/infras/storage/Setting/SettingStorage'
import Storage from '@/libs/Storage/Storage'

const storage = new Storage()
const settingStorage = new SettingStorage(storage)

@Module({ namespaced: true, name: 'setting' })
export default class SettingStore extends VuexModule {
  private _setting: Setting | null = null

  get setting() {
    return this._setting
  }

  @Mutation
  private updateSetting(setting: Setting) {
    this._setting = setting
  }

  @Action({ commit: 'updateSetting' })
  changeSetting(setting: Setting) {
    settingStorage.updateSetting(setting)

    return setting
  }

  @Action({ commit: 'updateSetting' })
  init(): Setting {
    return settingStorage.getSetting()
  }
}
