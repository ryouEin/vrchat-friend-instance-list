import { Notification } from '@/types'
import { INotifier } from '@/libs/Notifier/INotifier'
import { computed, reactive } from '@vue/composition-api'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  notifications: Notification[]
}
@MakeReferenceToWindowObjectInDevelopment('notificationsStore')
export class NotificationsStore {
  constructor(private readonly _notifier: INotifier) {}

  private readonly _state = reactive<State>({
    notifications: [],
  })

  readonly notifications = computed<Notification[]>(() => {
    return this._state.notifications
  })

  @LogBeforeAfter('_state')
  private addNotificationMutation(notification: Notification) {
    this._state.notifications.push(notification)
  }

  async pushNotificationAction(targetNotification: Notification) {
    this._notifier.notify(targetNotification.text)

    this.addNotificationMutation(targetNotification)
  }
}
