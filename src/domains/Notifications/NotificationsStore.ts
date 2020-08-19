import { Notification } from '@/types'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { INotification } from '@/libs/Notification/INotification'

type State = {
  notifications: Notification[]
}
@MakeReferenceToWindowObjectInDevelopment('notificationsStore')
export class NotificationsStore {
  private _state = Vue.observable<State>({
    notifications: [],
  })

  constructor(private readonly _notification: INotification) {}

  get notifications() {
    return this._state.notifications
  }

  @LogBeforeAfter('_state')
  private addNotificationMutation(notification: Notification) {
    this._state.notifications.push(notification)
  }

  async pushNotificationAction(notification: Notification) {
    this._notification.notify(notification.text)

    this.addNotificationMutation(notification)
  }
}
