import { INotifier } from './INotifier'
import { playNotificationSound } from '../Sound'

export class BrowserNotifier implements INotifier {
  notify(message: string, sound: boolean): void {
    const notify = new window.Notification(message)
    notify.onshow = () => {
      if (sound) {
        playNotificationSound()
      }
    }
  }
}
