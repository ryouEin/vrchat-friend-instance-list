import { computed, reactive } from '@vue/composition-api'
import { ToastProps } from '@/presentations/App/localComponents/Toasts/localComponent/script'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  toasts: (ToastProps & { isVisible: boolean })[]
}
@MakeReferenceToWindowObjectInDevelopment('toastsStore')
export class ToastsStore {
  private readonly _state = reactive<State>({
    toasts: [],
  })

  readonly toasts = computed(() => {
    return this._state.toasts
  })

  @LogBeforeAfter('_state')
  private addToastMutation(toast: ToastProps) {
    this._state.toasts.push({
      ...toast,
      isVisible: true,
    })
  }

  @LogBeforeAfter('_state')
  private removeToastMutation(index: number) {
    this._state.toasts = this._state.toasts.map((toast, currentIndex) => {
      if (currentIndex === index) {
        return {
          ...toast,
          isVisible: false,
        }
      }

      return toast
    })
  }

  async showAction(toast: ToastProps) {
    this.addToastMutation(toast)
  }

  async hideAction(index: number) {
    this.removeToastMutation(index)
  }
}
