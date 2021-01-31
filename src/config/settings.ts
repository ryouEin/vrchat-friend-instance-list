import { Setting } from '../presentations/types'

// インスタンスの人数を監視する際、人数を取得する感覚（ミリ秒）
export const INSTANCE_WATCH_INTERVAL = 60 * 1000

export const WORLD_CACHE = {
  CACHE_VERSION: '2',
  STORAGE_KEY: 'worldData',
  MAX_AGE_MILLI_SEC: 1000 * 60 * 60 * 24 * 7, // 1週間
  MAX_NUM: 1000,
}

export const MAX_FAVORITE_PER_GROUP = 32

export const DEFAULT_SETTING: Setting = {
  enableNotificationSound: true,
  theme: 'light',
  mainColor: 'green',
}
