import { computed, reactive } from '@vue/composition-api'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  counter: number
}
@MakeReferenceToWindowObjectInDevelopment('fullLoaderStore')
export class FullLoaderStore {
  private readonly _state = reactive<State>({
    counter: 0,
  })

  readonly isVisible = computed<boolean>(() => {
    return this._state.counter > 0
  })

  @LogBeforeAfter('_state')
  incrementCounterMutation() {
    this._state.counter++
  }

  @LogBeforeAfter('_state')
  decrementCounterMutation() {
    this._state.counter--
  }

  async showAction() {
    this.incrementCounterMutation()
  }

  async hideAction() {
    this.decrementCounterMutation()
  }
}
