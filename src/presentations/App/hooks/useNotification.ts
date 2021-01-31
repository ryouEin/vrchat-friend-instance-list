import { INotifier } from '../../../libs/Notifier/INotifier'
import { useState } from 'react'
import { Notification } from '../../types'
import { useSelector } from 'react-redux'
import { selectEnableNotificationSound } from '../../store/Setting/SettingStore'

export const useNotification = (notifier: INotifier) => {
  const enableNotificationSound = useSelector(selectEnableNotificationSound)
  const [notifications, setNotifications] = useState<Notification[]>([])

  const notify = (notification: Notification) => {
    notifier.notify(notification.text, enableNotificationSound)
    setNotifications(notifications.concat([notification]))
  }

  return {
    notifications,
    notify,
  }
}
