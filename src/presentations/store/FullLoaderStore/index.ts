import { computed, reactive } from '@vue/composition-api'

type State = {
  counter: number
}
export const createFullLoaderStore = () => {
  const state = reactive<State>({
    counter: 0,
  })

  const isVisible = computed<boolean>(() => {
    return state.counter > 0
  })

  const incrementCounterMutation = () => {
    state.counter++
  }

  const decrementCounterMutation = () => {
    state.counter--
  }

  const showAction = async () => {
    incrementCounterMutation()
  }

  const hideAction = async () => {
    decrementCounterMutation()
  }

  return {
    isVisible,
    showAction,
    hideAction,
  }
}

export type FullLoaderStore = ReturnType<typeof createFullLoaderStore>
