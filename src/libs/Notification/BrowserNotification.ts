import { INotification } from '@/libs/Notification/INotification'
import { settingStore } from '@/domains/DomainStoreFactory'
import { playNotificationSound } from '@/libs/Sound'

export class BrowserNotification implements INotification {
  notify(message: string): void {
    const notify = new window.Notification(message)
    notify.onshow = () => {
      if (settingStore.setting.enableNotificationSound) {
        playNotificationSound()
      }
    }
  }
}
