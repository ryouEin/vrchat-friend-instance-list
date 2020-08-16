import { Instance } from '@/types'
import { parseLocation } from '@/shame/parseLocation'
import worldsStore from '@/store/module/WorldsStore'
import Vue from 'vue'
import { LogBeforeAfter } from '@/libs/Decorators'

type State = {
  instance: Instance | null
}
class InstanceWatchDialogStore {
  private _state = Vue.observable<State>({
    instance: null,
  })

  get instance() {
    return this._state.instance
  }

  get world() {
    const instance = this.instance
    if (instance === null) {
      return undefined
    }

    const { worldId } = parseLocation(instance.location)
    return worldsStore.world(worldId)
  }

  get isVisible() {
    return this._state.instance !== null
  }

  @LogBeforeAfter('_state')
  private setInstanceMutation(instance: Instance) {
    this._state.instance = instance
  }

  @LogBeforeAfter('_state')
  clearInstanceMutation() {
    this._state.instance = null
  }

  async showAction(instance: Instance) {
    this.setInstanceMutation(instance)
  }

  async hideAction() {
    this.clearInstanceMutation()
  }
}

const instanceWatchDialogStore = new InstanceWatchDialogStore()

// TODO SOON: development環境で、デバッグのためグローバルに参照を通す処理を共通化
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  // @ts-ignore
  window.instanceWatchDialogStore = instanceWatchDialogStore
}

export default instanceWatchDialogStore
