import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'instanceModal' })
export default class InstanceModalStore extends VuexModule {
  private _location: string | null = null

  get location() {
    return this._location
  }

  get isVisible() {
    return this._location !== null
  }

  @Mutation
  setLocation(location: string) {
    this._location = location
  }

  @Mutation
  clearLocation() {
    this._location = null
  }

  @Action({ commit: 'setLocation' })
  show(location: string) {
    return location
  }

  @Action({ commit: 'clearLocation' })
  hide() {
    // clearLocationを呼び出すだけなので空
  }
}
