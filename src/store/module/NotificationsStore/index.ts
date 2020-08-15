import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Notification } from '@/types'
import { playNotificationSound } from '@/libs/Sound'
import settingStore from '@/store/module/SettingStore'

@Module({ namespaced: true, name: 'notifications' })
export default class NotificationsStore extends VuexModule {
  private _notifications: Notification[] = []

  get notifications() {
    return this._notifications
  }

  @Mutation
  private addNotification(notification: Notification) {
    this._notifications.push(notification)
  }

  @Action({ commit: 'addNotification', rawError: true })
  pushNotification(notification: Notification) {
    const notify = new window.Notification(notification.text)
    notify.onshow = () => {
      if (settingStore.setting.isEnabledNotificationSound) {
        playNotificationSound()
      }
    }

    return notification
  }
}
