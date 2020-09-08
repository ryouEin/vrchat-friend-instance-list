import { FriendsStore } from '@/domains/Friends/FriendsStore'
import { VRChatApiFriendsRepository } from '@/infras/Friends/VRChatApiFriendsRepository'
import { Network } from '@/libs/Network/Network'
import { VRChatApiInstancesRepository } from '@/infras/Instances/VRChatApiInstancesRepository'
import { InstancesStore } from '@/domains/Instances/InstancesStore'
import { NotificationsStore } from '@/domains/Notifications/NotificationsStore'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { SettingStore } from '@/domains/Setting/SettingStore'
import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'
import { VRChatApiWorldsRepository } from '@/infras/Worlds/VRChatApiWorldsRepository'
import { WorldsStore } from '@/domains/Worlds/WorldsStore'
import { BrowserNotification } from '@/libs/Notification/BrowserNotification'
import {
  VRChatApi,
  VRChatApiUnauthorizedError,
} from '@/libs/VRChatApi/VRChatApi'
import { showAuthorizationErrorDialog } from '@/presentations/ErrorDialogManager'

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

export const friendsStore = (() => {
  const friendsRepository = new VRChatApiFriendsRepository(vrchatApi)
  return new FriendsStore(friendsRepository)
})()

export const notificationsStore = (() => {
  const browserNotification = new BrowserNotification()
  return new NotificationsStore(browserNotification)
})()

export const settingStore = (() => {
  const settingRepository = new KeyValueStorageSettingRepository(
    new LocalStorage()
  )
  return new SettingStore(settingRepository)
})()

export const worldsStore = (() => {
  const cacheWorldsRepository = new CacheWorldsRepository(new LocalStorage())
  const networkWorldsRepository = new VRChatApiWorldsRepository(vrchatApi)
  return new WorldsStore(networkWorldsRepository, cacheWorldsRepository)
})()

export const instancesStore = (() => {
  const instancesRepository = new VRChatApiInstancesRepository(vrchatApi)
  return new InstancesStore(instancesRepository, worldsStore)
})()
