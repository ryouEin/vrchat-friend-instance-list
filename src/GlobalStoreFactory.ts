import { VRChatApiFriendsRepository } from '@/infras/Friends/VRChatApiFriendsRepository'
import { Network } from '@/libs/Network/Network'
import { VRChatApiInstancesRepository } from '@/infras/Instances/VRChatApiInstancesRepository'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'
import { VRChatApiWorldsRepository } from '@/infras/Worlds/VRChatApiWorldsRepository'
import { BrowserNotifier } from '@/libs/Notifier/BrowserNotifier'
import {
  VRChatApi,
  VRChatApiUnauthorizedError,
} from '@/libs/VRChatApi/VRChatApi'
import { showAuthorizationErrorDialog } from '@/presentations/ErrorDialogManager'
import { VRChatApiFavoritesRepository } from '@/infras/Favorites/VRChatApiFavoritesRepository'
import { AlertStore } from '@/presentations/store/AlertStore'
import { FullLoaderStore } from '@/presentations/store/FullLoaderStore'
import { ToastsStore } from '@/presentations/store/ToastsStore'
import { FavoritesStore } from '@/domains/Favorites/FavoritesStore'
import { FriendsStore } from '@/domains/Friends/FriendsStore'
import { InstancesStore } from '@/domains/Instances/InstancesStore'
import { NotificationsStore } from '@/domains/Notifications/NotificationsStore'
import { SettingStore } from '@/domains/Setting/SettingStore'
import { WorldsStore } from '@/domains/Worlds/WorldsStore'

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

  const network = new Network()
  const vrchatApi = new VRChatApi(network, error => {
    if (error instanceof VRChatApiUnauthorizedError) {
      showAuthorizationErrorDialog(alertStore)
    }

    throw error
  })

  const favoritesStore = (() => {
    const favoritesRepository = new VRChatApiFavoritesRepository(vrchatApi)
    return new FavoritesStore(favoritesRepository)
  })()

  const friendsStore = (() => {
    const friendsRepository = new VRChatApiFriendsRepository(vrchatApi)
    return new FriendsStore(friendsRepository, favoritesStore)
  })()

  const worldsStore = (() => {
    const cacheWorldsRepository = new CacheWorldsRepository(new LocalStorage())
    const networkWorldsRepository = new VRChatApiWorldsRepository(vrchatApi)
    return new WorldsStore(networkWorldsRepository, cacheWorldsRepository)
  })()

  const instancesStore = (() => {
    const instancesRepository = new VRChatApiInstancesRepository(vrchatApi)
    return new InstancesStore(instancesRepository, worldsStore)
  })()

  const settingStore = (() => {
    const settingRepository = new KeyValueStorageSettingRepository(
      new LocalStorage()
    )
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
