import { computed, reactive } from '@vue/composition-api'
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
  private readonly _state = reactive<State>({
    location: null,
  })

  readonly location = computed(() => {
    return this._state.location
  })

  readonly isVisible = computed(() => {
    return this._state.location !== null
  })

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
