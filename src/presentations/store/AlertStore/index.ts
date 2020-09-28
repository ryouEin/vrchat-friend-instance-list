import { AlertProps } from '@/presentations/App/localComponents/Alert/script'
import { computed, reactive } from '@vue/composition-api'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  alerts: AlertProps[]
}
@MakeReferenceToWindowObjectInDevelopment('alertStore')
export class AlertStore {
  private _state = reactive<State>({
    alerts: [],
  })

  readonly alerts = computed<AlertProps[]>(() => {
    return this._state.alerts
  })

  readonly alert = computed<AlertProps | undefined>(() => {
    if (this._state.alerts.length <= 0) return undefined

    return this._state.alerts[0]
  })

  @LogBeforeAfter('_state')
  private pushAlertMutation(alert: AlertProps) {
    this._state.alerts.push(alert)
  }

  @LogBeforeAfter('_state')
  private shiftAlertMutation() {
    this._state.alerts.shift()
  }

  async showAction(alert: AlertProps) {
    this.pushAlertMutation(alert)
  }

  async hideAction() {
    this.shiftAlertMutation()
  }
}
