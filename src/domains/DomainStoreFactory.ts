import { FriendsStore } from '@/domains/Friends/FriendsStore'
import { NetworkFriendsRepository } from '@/infras/Friends/NetworkFriendsRepository'
import { Network } from '@/libs/Network/Network'
import { NetworkInstancesRepository } from '@/infras/Instances/NetworkInstancesRepository'
import { InstancesStore } from '@/domains/Instances/InstancesStore'
import { NotificationsStore } from '@/domains/Notifications/NotificationsStore'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { SettingStore } from '@/domains/Setting/SettingStore'
import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'
import { NetworkWorldsRepository } from '@/infras/Worlds/NetworkWorldsRepository'
import { WorldsStore } from '@/domains/WorldsStore/WorldsStore'

export const friendsStore = (() => {
  const friendsRepository = new NetworkFriendsRepository(new Network())
  return new FriendsStore(friendsRepository)
})()

export const notificationsStore = (() => {
  return new NotificationsStore()
})()

export const settingStore = (() => {
  const settingRepository = new KeyValueStorageSettingRepository(
    new LocalStorage()
  )
  return new SettingStore(settingRepository)
})()

export const worldsStore = (() => {
  const cacheWorldsRepository = new CacheWorldsRepository(new LocalStorage())
  const networkWorldsRepository = new NetworkWorldsRepository(new Network())
  return new WorldsStore(networkWorldsRepository, cacheWorldsRepository)
})()

export const instancesStore = (() => {
  const instancesRepository = new NetworkInstancesRepository(new Network())
  return new InstancesStore(instancesRepository, worldsStore)
})()
