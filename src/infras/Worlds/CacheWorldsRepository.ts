import unionBy from 'lodash/unionBy'
import { WorldApiResponse } from '@/types/ApiResponse'
import IKeyValueStorage from '@/libs/Storage/IKeyValueStorage'
import { ICacheWorldsRepository } from '@/infras/Worlds/ICacheWorldsRepository'

const WORLD_STORAGE_KEY = 'worldData'

export class CacheWorldsRepository implements ICacheWorldsRepository {
  constructor(private _storage: IKeyValueStorage) {}

  async getWorlds(): Promise<WorldApiResponse[]> {
    const worldsJson = this._storage.getItem(WORLD_STORAGE_KEY)
    if (worldsJson === undefined) return []

    return JSON.parse(worldsJson)
  }

  async addWorld(world: WorldApiResponse) {
    this.addWorlds([world])
  }

  async addWorlds(worlds: WorldApiResponse[]) {
    const MAX_WORLD_NUM = 1000
    const storageWorlds = await this.getWorlds()
    const unionWorlds = unionBy(worlds, storageWorlds, 'id')

    this._storage.setItem(
      WORLD_STORAGE_KEY,
      // LocalStorageの容量を越さないために、データの数はMAX_WORLD_NUMに収める
      JSON.stringify(unionWorlds.slice(0, MAX_WORLD_NUM))
    )
  }
}
