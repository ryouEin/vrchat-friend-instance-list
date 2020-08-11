import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { InstanceLocation } from '@/types'

@Module({ namespaced: true, name: 'instanceModal' })
export default class InstanceModalStore extends VuexModule {
  private _location: InstanceLocation | null = null

  get location() {
    return this._location
  }

  get isVisible() {
    return this._location !== null
  }

  @Mutation
  setLocation(location: InstanceLocation) {
    this._location = location
  }

  @Mutation
  clearLocation() {
    this._location = null
  }

  @Action({ commit: 'setLocation', rawError: true })
  show(location: InstanceLocation) {
    return location
  }

  @Action({ commit: 'clearLocation', rawError: true })
  hide() {
    // clearLocationを呼び出すだけなので空
  }
}
