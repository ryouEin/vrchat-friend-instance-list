import { BrowserNotifier } from '@/libs/Notifier/BrowserNotifier'
import { AlertStore } from '@/presentations/store/AlertStore'
import { FullLoaderStore } from '@/presentations/store/FullLoaderStore'
import { ToastsStore } from '@/presentations/store/ToastsStore'
import { FavoritesStore } from '@/domains/Favorites/FavoritesStore'
import { FriendsStore } from '@/domains/Friends/FriendsStore'
import { InstancesStore } from '@/domains/Instances/InstancesStore'
import { NotificationsStore } from '@/domains/Notifications/NotificationsStore'
import { SettingStore } from '@/domains/Setting/SettingStore'
import { WorldsStore } from '@/domains/Worlds/WorldsStore'
import {
  cacheWorldsRepository,
  favoritesRepository,
  friendsRepository,
  instancesRepository,
  networkWorldsRepository,
  settingRepository,
} from '@/singletonFactory'

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

  const friendsStore = (() => {
    return new FriendsStore(friendsRepository, favoritesStore)
  })()

  const worldsStore = (() => {
    return new WorldsStore(networkWorldsRepository, cacheWorldsRepository)
  })()

  const instancesStore = (() => {
    return new InstancesStore(instancesRepository, worldsStore)
  })()

  const settingStore = (() => {
    return new SettingStore(settingRepository)
  })()

  const notificationsStore = (() => {
    const browserNotification = new BrowserNotifier(settingStore)
    return new NotificationsStore(browserNotification)
  })()

  return {
    friendsStore,
    favoritesStore,
    instancesStore,
    settingStore,
    notificationsStore,
    worldsStore,
    fullLoaderStore,
    toastsStore,
    alertStore,
  }
}

export type GlobalStore = ReturnType<typeof createGlobalStore>
