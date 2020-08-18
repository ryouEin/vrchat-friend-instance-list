import { FriendsStore } from '@/store/data/FriendsStore'
import { NetworkFriendsRepository } from '@/infras/Friends/NetworkFriendsRepository'
import { Network } from '@/libs/Network/Network'
import { NetworkInstancesRepository } from '@/infras/Instances/NetworkInstancesRepository'
import { InstancesStore } from '@/store/data/InstancesStore'
import { NotificationsStore } from '@/store/data/NotificationsStore'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import Storage from '@/libs/Storage/Storage'
import { SettingStore } from '@/store/data/SettingStore'
import { WorldStorage } from '@/infras/Worlds/Storage/WorldStorage'
import { WorldsApi } from '@/infras/Worlds/Api/WorldsApi'
import { WorldsRepository } from '@/infras/Worlds/WorldsRepository'
import { WorldsStore } from '@/store/data/WorldsStore'

export const friendsStore = (() => {
  const friendsRepository = new NetworkFriendsRepository(new Network())
  return new FriendsStore(friendsRepository)
})()

export const notificationsStore = (() => {
  return new NotificationsStore()
})()

export const settingStore = (() => {
  const settingRepository = new KeyValueStorageSettingRepository(new Storage())
  return new SettingStore(settingRepository)
})()

export const worldsStore = (() => {
  const worldStorage = new WorldStorage(new Storage())
  const worldsApi = new WorldsApi(new Network())
  const worldsRepository = new WorldsRepository(worldsApi, worldStorage)
  return new WorldsStore(worldsRepository)
})()

export const instancesStore = (() => {
  const instancesRepository = new NetworkInstancesRepository(new Network())
  return new InstancesStore(instancesRepository, worldsStore)
})()
