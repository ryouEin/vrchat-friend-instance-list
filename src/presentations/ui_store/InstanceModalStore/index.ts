import Vue from 'vue'
import { InstanceLocation } from '@/types'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  location: InstanceLocation | null
}
@MakeReferenceToWindowObjectInDevelopment('instanceModalStore')
export class InstanceModalStore {
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
