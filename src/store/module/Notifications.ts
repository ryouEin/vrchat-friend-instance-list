import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Notification } from '@/types'

@Module({ namespaced: true, name: 'notifications' })
export default class Worlds extends VuexModule {
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
    new window.Notification(notification.text)

    return notification
  }
}
