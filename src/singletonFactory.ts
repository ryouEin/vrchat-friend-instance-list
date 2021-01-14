// TODO: cacheWorldsRepository以外のRepository等もここで生成するようにする
import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'
import { WORLD_CACHE } from '@/config/settings'

export const cacheWorldsRepository = new CacheWorldsRepository(
  new LocalStorage(),
  {
    storageKey: WORLD_CACHE.STORAGE_KEY,
    cacheVersion: WORLD_CACHE.CACHE_VERSION,
    maxAgeMSec: WORLD_CACHE.MAX_AGE_MILLI_SEC,
    maxNum: WORLD_CACHE.MAX_NUM,
  }
)
