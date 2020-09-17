import { VRChatApiFriendsRepository } from '@/infras/Friends/VRChatApiFriendsRepository'
import { Network } from '@/libs/Network/Network'
import { VRChatApiInstancesRepository } from '@/infras/Instances/VRChatApiInstancesRepository'
import { createInstancesStore } from '@/domains/Instances/InstancesStore'
import { createNotificationsStore } from '@/domains/Notifications/NotificationsStore'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { createSettingStore } from '@/domains/Setting/SettingStore'
import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'
import { VRChatApiWorldsRepository } from '@/infras/Worlds/VRChatApiWorldsRepository'
import { BrowserNotification } from '@/libs/Notification/BrowserNotification'
import {
  VRChatApi,
  VRChatApiUnauthorizedError,
} from '@/libs/VRChatApi/VRChatApi'
import { showAuthorizationErrorDialog } from '@/presentations/ErrorDialogManager'
import { VRChatApiFavoritesRepository } from '@/infras/Favorites/VRChatApiFavoritesRepository'
import { createFriendsStore } from '@/domains/Friends/FriendsStore'
import { createFavoritesStore } from '@/domains/Favorites/FavoritesStore'
import { createWorldsStore } from '@/domains/Worlds/WorldsStore'

const network = new Network()
const vrchatApi = new VRChatApi(network, error => {
  // TODO
  //  ここは一応ドメイン層だけど、UI層の処理が入り込んでくることに違和感
  //  ただ他に共通エラーダイアログを表示するいい方法が思い浮かばないので一旦ここで
  //  （ファクトリなので、ドメイン層ではないという感じも
  if (error instanceof VRChatApiUnauthorizedError) {
    showAuthorizationErrorDialog()
  } else {
    throw error
  }
})

export const createDomainStore = () => {
  const favoritesStore = (() => {
    const favoritesRepository = new VRChatApiFavoritesRepository(vrchatApi)
    return createFavoritesStore(favoritesRepository)
  })()

  const friendsStore = (() => {
    const friendsRepository = new VRChatApiFriendsRepository(vrchatApi)
    return createFriendsStore(friendsRepository, favoritesStore)
  })()

  const worldsStore = (() => {
    const cacheWorldsRepository = new CacheWorldsRepository(new LocalStorage())
    const networkWorldsRepository = new VRChatApiWorldsRepository(vrchatApi)
    return createWorldsStore(networkWorldsRepository, cacheWorldsRepository)
  })()

  const instancesStore = (() => {
    const instancesRepository = new VRChatApiInstancesRepository(vrchatApi)
    return createInstancesStore(instancesRepository, worldsStore)
  })()

  const settingStore = (() => {
    const settingRepository = new KeyValueStorageSettingRepository(
      new LocalStorage()
    )
    return createSettingStore(settingRepository)
  })()

  const notificationsStore = (() => {
    const browserNotification = new BrowserNotification(settingStore)
    return createNotificationsStore(browserNotification)
  })()

  return {
    friendsStore,
    favoritesStore,
    instancesStore,
    settingStore,
    notificationsStore,
    worldsStore,
  }
}

export type DomainStore = ReturnType<typeof createDomainStore>
