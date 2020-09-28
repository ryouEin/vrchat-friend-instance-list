import { Instance } from '@/types'
import { computed, reactive } from '@vue/composition-api'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  instance: Instance | null
}
@MakeReferenceToWindowObjectInDevelopment('instanceWatchDialogStore')
export class InstanceWatchDialogStore {
  private readonly _state = reactive<State>({
    instance: null,
  })

  readonly instance = computed(() => {
    return this._state.instance
  })

  readonly isVisible = computed(() => {
    return this._state.instance !== null
  })

  @LogBeforeAfter('_state')
  private setInstanceMutation(instance: Instance) {
    this._state.instance = instance
  }

  @LogBeforeAfter('_state')
  private clearInstanceMutation() {
    this._state.instance = null
  }

  async showAction(instance: Instance) {
    this.setInstanceMutation(instance)
  }

  async hideAction() {
    this.clearInstanceMutation()
  }
}
