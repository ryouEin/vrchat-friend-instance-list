import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { AlertProps } from '@/presentations/App/localComponents/Alert/script'

type State = {
  alerts: AlertProps[]
}
@MakeReferenceToWindowObjectInDevelopment('alertStore')
export class AlertStore {
  private _state = Vue.observable<State>({
    alerts: [],
  })

  get alerts() {
    return this._state.alerts
  }

  get alert(): AlertProps | undefined {
    if (this.alerts.length <= 0) return undefined

    return this.alerts[0]
  }

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
