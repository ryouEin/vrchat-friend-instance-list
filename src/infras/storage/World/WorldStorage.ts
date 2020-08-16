import unionBy from 'lodash/unionBy'
import { World } from '@/types/ApiResponse'
import IStorage from '@/libs/Storage/IStorage'
import { IWorldStorage } from '@/infras/storage/World/IWorldStorage'

const WORLD_STORAGE_KEY = 'worldData'

export class WorldStorage implements IWorldStorage {
  constructor(private _storage: IStorage) {}

  async getWorlds(): Promise<World[]> {
    const worldsJson = this._storage.getItem(WORLD_STORAGE_KEY)
    if (worldsJson === undefined) return []

    return JSON.parse(worldsJson)
  }

  async addWorld(world: World) {
    this.addWorlds([world])
  }

  async addWorlds(worlds: World[]) {
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
