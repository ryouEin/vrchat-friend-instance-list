import { computed, reactive } from '@vue/composition-api'
import { ToastProps } from '@/presentations/App/localComponents/Toasts/localComponent/script'

type State = {
  toasts: (ToastProps & { isVisible: boolean })[]
}
export const createToastsStore = () => {
  const state = reactive<State>({
    toasts: [],
  })

  const toasts = computed(() => {
    return state.toasts
  })

  const addToastMutation = (toast: ToastProps) => {
    state.toasts.push({
      ...toast,
      isVisible: true,
    })
  }

  const removeToastMutation = (index: number) => {
    state.toasts = state.toasts.map((toast, currentIndex) => {
      if (currentIndex === index) {
        return {
          ...toast,
          isVisible: false,
        }
      }

      return toast
    })
  }

  const showAction = async (toast: ToastProps) => {
    addToastMutation(toast)
  }

  const hideAction = async (index: number) => {
    removeToastMutation(index)
  }

  return {
    toasts,
    showAction,
    hideAction,
  }
}

export type ToastsStore = ReturnType<typeof createToastsStore>
