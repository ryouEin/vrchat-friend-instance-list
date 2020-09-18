import { Notification } from '@/types'
import { INotification } from '@/libs/Notification/INotification'
import { computed, reactive } from '@vue/composition-api'

type State = {
  notifications: Notification[]
}
export const createNotificationsStore = (notification: INotification) => {
  const state = reactive<State>({
    notifications: [],
  })

  const notifications = computed<Notification[]>(() => {
    return state.notifications
  })

  const addNotificationMutation = (notification: Notification) => {
    state.notifications.push(notification)
  }

  const pushNotificationAction = async (targetNotification: Notification) => {
    notification.notify(targetNotification.text)

    addNotificationMutation(targetNotification)
  }

  return {
    notifications,
    pushNotificationAction,
  }
}
