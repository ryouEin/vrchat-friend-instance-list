import { Notification } from '@/types'
import { playNotificationSound } from '@/libs/Sound'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { settingStore } from '@/domains/DomainStoreFactory'

// TODO SOON: テスト
type State = {
  notifications: Notification[]
}
@MakeReferenceToWindowObjectInDevelopment('notificationsStore')
export class NotificationsStore {
  private _state = Vue.observable<State>({
    notifications: [],
  })

  get notifications() {
    return this._state.notifications
  }

  @LogBeforeAfter('_state')
  private addNotificationMutation(notification: Notification) {
    this._state.notifications.push(notification)
  }

  async pushNotificationAction(notification: Notification) {
    // TODO SOON: 通知送信する処理別でまとめて、DIする
    const notify = new window.Notification(notification.text)
    notify.onshow = () => {
      if (settingStore.setting.isEnabledNotificationSound) {
        playNotificationSound()
      }
    }

    this.addNotificationMutation(notification)
  }
}
