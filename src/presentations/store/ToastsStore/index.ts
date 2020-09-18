import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { ToastProps } from '@/presentations/App/localComponents/Toasts/localComponent/script'

type State = {
  toasts: (ToastProps & { isVisible: boolean })[]
}
@MakeReferenceToWindowObjectInDevelopment('toastsStore')
export class ToastsStore {
  private _state = Vue.observable<State>({
    toasts: [],
  })

  get toasts() {
    return this._state.toasts
  }

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
