import { INotifier } from '@/libs/Notifier/INotifier'
import { playNotificationSound } from '@/libs/Sound'
import { SettingStore } from '@/domains/Setting/SettingStore'

export class BrowserNotifier implements INotifier {
  constructor(private readonly _settingStore: SettingStore) {}

  notify(message: string): void {
    const notify = new window.Notification(message)
    notify.onshow = () => {
      if (this._settingStore.setting.value.enableNotificationSound) {
        playNotificationSound()
      }
    }
  }
}
