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
import { WorldsStore } from '@/domains/WorldsStore/WorldsStore'
import { BrowserNotification } from '@/libs/Notification/BrowserNotification'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'

export const friendsStore = (() => {
  const vrchatApi = new VRChatApi(new Network())
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
  const vrchatApi = new VRChatApi(new Network())
  const networkWorldsRepository = new VRChatApiWorldsRepository(vrchatApi)
  return new WorldsStore(networkWorldsRepository, cacheWorldsRepository)
})()

export const instancesStore = (() => {
  const vrchatApi = new VRChatApi(new Network())
  const instancesRepository = new VRChatApiInstancesRepository(vrchatApi)
  return new InstancesStore(instancesRepository, worldsStore)
})()
