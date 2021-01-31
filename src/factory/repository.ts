import { WorldsCache } from '../repositories/Worlds/WorldsCache/WorldsCache'
import LocalStorage from '../libs/Storage/LocalStorage'
import { WORLD_CACHE } from '../config/settings'
import { VRChatApiFavoritesRepository } from '../repositories/Favorites/VRChatApiFavoritesRepository'
import { VRChatApiFriendsRepository } from '../repositories/Friends/VRChatApiFriendsRepository'
import { VRChatApiInstancesRepository } from '../repositories/Instances/VRChatApiInstancesRepository'
import { KeyValueStorageSettingRepository } from '../repositories/Setting/KeyValueStorageSettingRepository'
import MicroCmsApiNewsRepository from '../repositories/News/MicroCmsApiNewsRepository'
import { MicroCmsApi } from '../libs/MicroCmsApi/MicroCmsApi'
import { VRChatApiFriendLocationsRepository } from '../repositories/FriendLocations/VRChatApiFriendLocationsRepository'
import { WorldsRepository } from '../repositories/Worlds/WorldsRepository'
import { KeyValueStorageLastCheckNewsAt } from '../repositories/News/KeyValueStorageLastCheckNewsAt'
import { vrchatApi } from './vrchatApi'
import { network } from './network'

export const favoritesRepository = new VRChatApiFavoritesRepository(vrchatApi)

export const friendsRepository = new VRChatApiFriendsRepository(vrchatApi)

export const friendLocationsRepository = new VRChatApiFriendLocationsRepository(
  friendsRepository
)

export const instancesRepository = new VRChatApiInstancesRepository(vrchatApi)

export const settingRepository = new KeyValueStorageSettingRepository(
  new LocalStorage()
)

export const newsRepository = new MicroCmsApiNewsRepository(
  new KeyValueStorageLastCheckNewsAt(),
  new MicroCmsApi(network)
)

export const cacheWorldsRepository = new WorldsCache(new LocalStorage(), {
  storageKey: WORLD_CACHE.STORAGE_KEY,
  cacheVersion: WORLD_CACHE.CACHE_VERSION,
  maxAgeMSec: WORLD_CACHE.MAX_AGE_MILLI_SEC,
  maxNum: WORLD_CACHE.MAX_NUM,
})

export const worldsRepository = new WorldsRepository(
  cacheWorldsRepository,
  vrchatApi
)
