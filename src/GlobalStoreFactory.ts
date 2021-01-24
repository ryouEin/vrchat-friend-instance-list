import { BrowserNotifier } from '@/libs/Notifier/BrowserNotifier'
import { AlertStore } from '@/presentations/store/AlertStore'
import { FullLoaderStore } from '@/presentations/store/FullLoaderStore'
import { ToastsStore } from '@/presentations/store/ToastsStore'
import { FavoritesStore } from '@/store/Favorites/FavoritesStore'
import { NotificationsStore } from '@/store/Notifications/NotificationsStore'
import { SettingStore } from '@/store/Setting/SettingStore'
import { favoritesRepository, settingRepository } from '@/singletonFactory'
import { WatchingInstancesStore } from '@/store/WatchingInstances/WatchingInstancesStore'
import { InstanceUserNumsStore } from '@/store/InstanceUserNums/InstanceUserNumsStore'

export const createGlobalStore = () => {
  const fullLoaderStore = (() => {
    return new FullLoaderStore()
  })()

  const toastsStore = (() => {
    return new ToastsStore()
  })()

  const alertStore = (() => {
    return new AlertStore()
  })()

  const favoritesStore = (() => {
    return new FavoritesStore(favoritesRepository)
  })()

  const instanceUserNumsStore = (() => {
    return new InstanceUserNumsStore()
  })()

  const watchingInstancesStore = (() => {
    return new WatchingInstancesStore()
  })()

  const settingStore = (() => {
    return new SettingStore(settingRepository)
  })()

  const notificationsStore = (() => {
    const browserNotification = new BrowserNotifier(settingStore)
    return new NotificationsStore(browserNotification)
  })()

  return {
    favoritesStore,
    settingStore,
    instanceUserNumsStore,
    watchingInstancesStore,
    notificationsStore,
    fullLoaderStore,
    toastsStore,
    alertStore,
  }
}

export type GlobalStore = ReturnType<typeof createGlobalStore>
