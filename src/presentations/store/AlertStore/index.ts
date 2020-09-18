import { AlertProps } from '@/presentations/App/localComponents/Alert/script'
import { computed, reactive } from '@vue/composition-api'

type State = {
  alerts: AlertProps[]
}
export const createAlertStore = () => {
  const state = reactive<State>({
    alerts: [],
  })

  const alerts = computed<AlertProps[]>(() => {
    return state.alerts
  })

  const alert = computed<AlertProps | undefined>(() => {
    if (state.alerts.length <= 0) return undefined

    return state.alerts[0]
  })

  const pushAlertMutation = (alert: AlertProps) => {
    state.alerts.push(alert)
  }

  const shiftAlertMutation = () => {
    state.alerts.shift()
  }

  const showAction = async (alert: AlertProps) => {
    pushAlertMutation(alert)
  }

  const hideAction = async () => {
    shiftAlertMutation()
  }

  return {
    alerts,
    alert,
    showAction,
    hideAction,
  }
}

export type AlertStore = ReturnType<typeof createAlertStore>
