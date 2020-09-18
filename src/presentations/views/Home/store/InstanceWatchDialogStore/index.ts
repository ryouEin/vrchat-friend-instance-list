import { Instance } from '@/types'
import { computed, reactive } from '@vue/composition-api'

type State = {
  instance: Instance | null
}
export const createInstanceWatchDialogStore = () => {
  const state = reactive<State>({
    instance: null,
  })

  const instance = computed(() => {
    return state.instance
  })

  const isVisible = computed(() => {
    return state.instance !== null
  })

  const setInstanceMutation = (instance: Instance) => {
    state.instance = instance
  }

  const clearInstanceMutation = () => {
    state.instance = null
  }

  const showAction = async (instance: Instance) => {
    setInstanceMutation(instance)
  }

  const hideAction = async () => {
    clearInstanceMutation()
  }

  return {
    instance,
    isVisible,
    showAction,
    hideAction,
  }
}

export type InstanceWatchDialogStore = ReturnType<
  typeof createInstanceWatchDialogStore
>
