import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  counter: number
}
@MakeReferenceToWindowObjectInDevelopment('instanceModalStore')
export class FullLoaderStore {
  private _state = Vue.observable<State>({
    counter: 0,
  })

  get isVisible() {
    return this._state.counter > 0
  }

  @LogBeforeAfter('_state')
  private incrementCounterMutation() {
    this._state.counter++
  }

  @LogBeforeAfter('_state')
  private decrementCounterMutation() {
    this._state.counter--
  }

  async showAction() {
    this.incrementCounterMutation()
  }

  async hideAction() {
    this.decrementCounterMutation()
  }
}
