import Vue from 'vue'
import { InstanceLocation } from '@/types'
import { LogBeforeAfter } from '@/libs/Decorators'

type State = {
  location: InstanceLocation | null
}
class InstanceModalStore {
  private _state = Vue.observable<State>({
    location: null,
  })

  get location() {
    return this._state.location
  }

  get isVisible() {
    return this._state.location !== null
  }

  @LogBeforeAfter('_state')
  private setLocationMutation(location: InstanceLocation) {
    this._state.location = location
  }

  @LogBeforeAfter('_state')
  private clearLocationMutation() {
    this._state.location = null
  }

  async showAction(location: InstanceLocation) {
    this.setLocationMutation(location)
  }

  async hideAction() {
    this.clearLocationMutation()
  }
}

const instanceModalStore = new InstanceModalStore()

// TODO SOON: development環境で、デバッグのためグローバルに参照を通す処理を共通化
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  // @ts-ignore
  window.instanceModalStore = instanceModalStore
}

export default instanceModalStore
