import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Instance } from '@/types'
import { worldsModule } from '@/presentations/store/ModuleFactory'

@Module({ namespaced: true, name: 'instanceWatchDialog' })
export default class InstanceWatchDialogStore extends VuexModule {
  private _instance: Instance | null = null

  get instance() {
    return this._instance
  }

  get world() {
    const instance = this.instance
    if (instance === null) {
      return undefined
    }

    // TODO SOON: locationをworldIdとinstanceIdに分ける処理共通化
    const worldId = instance.location.split(':')[0]
    return worldsModule.world(worldId)
  }

  get isVisible() {
    return this._instance !== null
  }

  @Mutation
  setInstance(instance: Instance) {
    this._instance = instance
  }

  @Mutation
  clearInstance() {
    this._instance = null
  }

  @Action({ commit: 'setInstance' })
  show(instance: Instance) {
    return instance
  }

  @Action({ commit: 'clearInstance' })
  hide() {
    // clearInstanceを呼び出すだけなので空
  }
}
