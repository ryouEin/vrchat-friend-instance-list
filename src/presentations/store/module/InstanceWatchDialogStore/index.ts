import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Instance } from '@/types'
import { worldsModule } from '@/presentations/store/ModuleFactory'
import { parseLocation } from '@/shame/parseLocation'

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

    const { worldId } = parseLocation(instance.location)
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

  @Action({ commit: 'setInstance', rawError: true })
  show(instance: Instance) {
    return instance
  }

  @Action({ commit: 'clearInstance', rawError: true })
  hide() {
    // clearInstanceを呼び出すだけなので空
  }
}
