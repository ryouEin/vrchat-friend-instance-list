import unionBy from 'lodash/unionBy'
import { World } from '@/types/ApiResponse'
import IStorage from '@/libs/Storage/IStorage'

const WORLD_STORAGE_KEY = 'worldData'

export class WorldStorage {
  constructor(private _storage: IStorage) {}

  getWorlds(): World[] {
    const worldsJson = this._storage.getItem(WORLD_STORAGE_KEY)
    if (worldsJson === undefined) return []

    return JSON.parse(worldsJson)
  }

  addWorld(world: World) {
    this.addWorlds([world])
  }

  addWorlds(worlds: World[]) {
    const MAX_WORLD_NUM = 1000
    const storageWorlds = this.getWorlds()
    const unionWorlds = unionBy(worlds, storageWorlds, 'id')

    this._storage.setItem(
      WORLD_STORAGE_KEY,
      // LocalStorageの容量を越さないために、データの数はMAX_WORLD_NUMに収める
      JSON.stringify(unionWorlds.slice(0, MAX_WORLD_NUM))
    )
  }
}
