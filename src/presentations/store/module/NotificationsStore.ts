import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Notification } from '@/types'
import { playNotificationSound } from '@/libs/Sound'
import { settingModule } from '@/presentations/store/ModuleFactory'

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

  @Action({ commit: 'addNotification' })
  pushNotification(notification: Notification) {
    const notify = new window.Notification(notification.text)
    notify.onshow = () => {
      if (settingModule.setting?.enableNotificationSound) {
        playNotificationSound()
      }
    }

    return notification
  }
}
