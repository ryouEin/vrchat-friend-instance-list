import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { WORLD_CACHE } from '@/config/settings'
import { Network } from '@/libs/Network/Network'
import { VRChatApi } from '@/libs/VRChatApi/VRChatApi'
import { VRChatApiFavoritesRepository } from '@/infras/Favorites/VRChatApiFavoritesRepository'
import { VRChatApiFriendsRepository } from '@/infras/Friends/VRChatApiFriendsRepository'
import { VRChatApiWorldsRepository } from '@/infras/Worlds/VRChatApiWorldsRepository'
import { VRChatApiInstancesRepository } from '@/infras/Instances/VRChatApiInstancesRepository'
import { KeyValueStorageSettingRepository } from '@/infras/Setting/KeyValueStorageSettingRepository'
import { ProductionLogger } from '@/libs/Logger/ProductionLogger'
import { DevelopmentLogger } from '@/libs/Logger/DevelopmentLogger'
import MicroCmsApiNewsRepository from '@/infras/News/MicroCmsApiNewsRepository'
import { MicroCmsApi } from '@/libs/MicroCmsApi/MicroCmsApi'

const network = new Network()
export const vrchatApi = new VRChatApi(network)

export const favoritesRepository = new VRChatApiFavoritesRepository(vrchatApi)

export const friendsRepository = new VRChatApiFriendsRepository(vrchatApi)

export const networkWorldsRepository = new VRChatApiWorldsRepository(vrchatApi)

export const instancesRepository = new VRChatApiInstancesRepository(vrchatApi)

export const settingRepository = new KeyValueStorageSettingRepository(
  new LocalStorage()
)

export const newsRepository = new MicroCmsApiNewsRepository(
  new MicroCmsApi(network)
)

export const cacheWorldsRepository = new CacheWorldsRepository(
  new LocalStorage(),
  {
    storageKey: WORLD_CACHE.STORAGE_KEY,
    cacheVersion: WORLD_CACHE.CACHE_VERSION,
    maxAgeMSec: WORLD_CACHE.MAX_AGE_MILLI_SEC,
    maxNum: WORLD_CACHE.MAX_NUM,
  }
)

export const logger = (() => {
  if (process.env.NOD_ENV === 'production') {
    return new ProductionLogger()
  }

  return new DevelopmentLogger()
})()
