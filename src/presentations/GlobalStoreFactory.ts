import { BrowserNotifier } from '@/libs/Notifier/BrowserNotifier'
import { AlertStore } from '@/presentations/store/AlertStore'
import { FullLoaderStore } from '@/presentations/store/FullLoaderStore'
import { ToastsStore } from '@/presentations/store/ToastsStore'
import { FavoritesStore } from '@/presentations/store/Favorites/FavoritesStore'
import { NotificationsStore } from '@/presentations/store/Notifications/NotificationsStore'
import { SettingStore } from '@/presentations/store/Setting/SettingStore'
import { favoritesRepository, settingRepository } from '@/singletonFactory'
import { WatchingInstancesStore } from '@/presentations/store/WatchingInstances/WatchingInstancesStore'
import { InstanceUserNumsStore } from '@/presentations/store/InstanceUserNums/InstanceUserNumsStore'

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
