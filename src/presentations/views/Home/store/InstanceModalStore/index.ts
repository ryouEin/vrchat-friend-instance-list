import { computed, reactive } from '@vue/composition-api'
import { InstanceLocation } from '@/types'

type State = {
  location: InstanceLocation | null
}
export const createInstanceModalStore = () => {
  const state = reactive<State>({
    location: null,
  })

  const location = computed(() => {
    return state.location
  })

  const isVisible = computed(() => {
    return state.location !== null
  })

  const setLocationMutation = (location: InstanceLocation) => {
    state.location = location
  }

  const clearLocationMutation = () => {
    state.location = null
  }

  const showAction = async (location: InstanceLocation) => {
    setLocationMutation(location)
  }

  const hideAction = async () => {
    clearLocationMutation()
  }

  return {
    location,
    isVisible,
    showAction,
    hideAction,
  }
}

export type InstanceModalStore = ReturnType<typeof createInstanceModalStore>
