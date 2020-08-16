import { Notification } from '@/types'
import { playNotificationSound } from '@/libs/Sound'
import settingStore from '@/store/data/SettingStore'
import Vue from 'vue'
import { LogBeforeAfter } from '@/libs/Decorators'

// TODO SOON: テスト
type State = {
  notifications: Notification[]
}
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

const notificationsStore = new NotificationsStore()

// TODO SOON: development環境で、デバッグのためグローバルに参照を通す処理を共通化
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  // @ts-ignore
  window.notificationsStore = notificationsStore
}

export default notificationsStore
