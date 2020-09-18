import { Instance } from '@/types'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  instance: Instance | null
}
@MakeReferenceToWindowObjectInDevelopment('instanceWatchDialogStore')
export class InstanceWatchDialogStore {
  private _state = Vue.observable<State>({
    instance: null,
  })

  get instance() {
    return this._state.instance
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
