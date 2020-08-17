import { FriendsStore } from '@/store/data/FriendsStore'
import { FriendsRepository } from '@/infras/Friends/FriendsRepository'
import { FriendsApi } from '@/infras/Friends/Api/FriendsApi'
import { Network } from '@/libs/Network/Network'
import { InstancesRepository } from '@/infras/Instances/InstancesRepository'
import { InstancesApi } from '@/infras/Instances/Api/InstancesApi'
import { InstancesStore } from '@/store/data/InstancesStore'
import { NotificationsStore } from '@/store/data/NotificationsStore'
import { SettingRepository } from '@/infras/Setting/SettingRepository'
import { SettingStorage } from '@/infras/Setting/Storage/SettingStorage'
import Storage from '@/libs/Storage/Storage'
import { SettingStore } from '@/store/data/SettingStore'
import { WorldStorage } from '@/infras/Worlds/Storage/WorldStorage'
import { WorldsApi } from '@/infras/Worlds/Api/WorldsApi'
import { WorldsRepository } from '@/infras/Worlds/WorldsRepository'
import { WorldsStore } from '@/store/data/WorldsStore'

export const friendsStore = (() => {
  const friendsRepository = new FriendsRepository(new FriendsApi(new Network()))
  return new FriendsStore(friendsRepository)
})()

export const instancesStore = (() => {
  const instancesRepository = new InstancesRepository(
    new InstancesApi(new Network())
  )
  return new InstancesStore(instancesRepository)
})()

export const notificationsStore = (() => {
  return new NotificationsStore()
})()

export const settingStore = (() => {
  const settingRepository = new SettingRepository(
    new SettingStorage(new Storage())
  )
  return new SettingStore(settingRepository)
})()

export const worldsStore = (() => {
  const worldStorage = new WorldStorage(new Storage())
  const worldsApi = new WorldsApi(new Network())
  const worldsRepository = new WorldsRepository(worldsApi, worldStorage)
  return new WorldsStore(worldsRepository)
})()
