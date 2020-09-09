// インスタンスの人数を監視する際、人数を取得する感覚（ミリ秒）
import { Setting } from '@/types'

export const INSTANCE_WATCH_INTERVAL = 60 * 1000

export const DEFAULT_SETTING: Setting = {
  enableNotificationSound: true,
  theme: 'light',
  mainColor: 'green',
}
