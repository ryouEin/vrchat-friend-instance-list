import unionBy from 'lodash/unionBy'
import { WorldApiResponse } from '../../../types/ApiResponse'
import { IKeyValueStorage } from '../../../libs/Storage/IKeyValueStorage'
import { IWorldsCache } from './IWorldsCache'
import { VersionedKVS } from '../../../libs/Storage/VersionedKVS'

type WorldCache = {
  updatedAt: number
  data: WorldApiResponse
}
type Options = {
  cacheVersion: string
  storageKey: string
  maxAgeMSec: number
  maxNum: number
}

export class WorldsCache implements IWorldsCache {
  versionedKVS: VersionedKVS<WorldCache[]>

  constructor(private storage: IKeyValueStorage, private options: Options) {
    this.versionedKVS = new VersionedKVS<WorldCache[]>(storage, {
      storageKey: options.storageKey,
      version: options.cacheVersion,
      initialData: () => [],
    })
  }

  async getWorlds(): Promise<WorldApiResponse[]> {
    const worldData = this.versionedKVS.get()

    const cacheIsExpiredIfUpdatedBefore = Date.now() - this.options.maxAgeMSec
    const newWorlds = worldData.filter((world) => {
      return world.updatedAt > cacheIsExpiredIfUpdatedBefore
    })
    this.versionedKVS.set(newWorlds)

    return newWorlds.map((world) => {
      return {
        ...world.data,
      }
    })
  }

  async addWorld(world: WorldApiResponse) {
    await this.addWorlds([world])
  }

  async addWorlds(worlds: WorldApiResponse[]) {
    const currentTimeStamp = Date.now()
    const addCacheWorlds: WorldCache[] = worlds.map((world) => {
      return {
        updatedAt: currentTimeStamp,
        data: { ...world },
      }
    })
    const cacheWorlds = this.versionedKVS.get()
    const unionWorlds = unionBy(addCacheWorlds, cacheWorlds, 'data.id')
    unionWorlds.sort((a, b) => {
      return a.updatedAt > b.updatedAt ? -1 : 1
    })

    // LocalStorageの容量を越さないために、データの数はmaxNumに収める
    this.versionedKVS.set(unionWorlds.slice(0, this.options.maxNum))
  }
}
