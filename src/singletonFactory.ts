import { WorldsCache } from '@/infras/Worlds/WorldsCache/WorldsCache'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { WORLD_CACHE } from '@/config/settings'
import { Network } from '@/libs/Network/Network'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'
import { VRChatApiFavoritesRepository } from '@/infras/Favorites/VRChatApiFavoritesRepository'
import { VRChatApiFriendsRepository } from '@/infras/Friends/VRChatApiFriendsRepository'
import { VRChatApiInstancesRepository } from '@/infras/Instances/VRChatApiInstancesRepository'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import { ProductionLogger } from '@/libs/Logger/ProductionLogger'
import { DevelopmentLogger } from '@/libs/Logger/DevelopmentLogger'
import MicroCmsApiNewsRepository from '@/infras/News/MicroCmsApiNewsRepository'
import { MicroCmsApi } from '@/libs/MicroCmsApi/MicroCmsApi'
import { VRChatApiFriendLocationsRepository } from '@/infras/FriendLocations/VRChatApiFriendLocationsRepository'
import { WorldsRepository } from '@/infras/Worlds/WorldsRepository'
import { KeyValueStorageLastCheckNewsAt } from '@/infras/News/KeyValueStorageLastCheckNewsAt'

const network = new Network()
export const vrchatApi = new VRChatApi(network)

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

export const logger = (() => {
  if (process.env.NOD_ENV === 'production') {
    return new ProductionLogger()
  }

  return new DevelopmentLogger()
})()
