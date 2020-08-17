import { IWorldsRepository } from '@/infras/Worlds/IWorldsRepository'
import { World } from '@/types/ApiResponse'
import { IWorldsApi } from '@/infras/Worlds/Api/IWorldsApi'
import { IWorldStorage } from '@/infras/Worlds/Storage/IWorldStorage'

export class WorldsRepository implements IWorldsRepository {
  constructor(
    private readonly _worldsApi: IWorldsApi,
    private readonly _worldStorage: IWorldStorage
  ) {}

  async updateCacheByPopularWorlds(): Promise<void> {
    const popularWorlds = await this._worldsApi.fetchPopularWorlds()
    await this._worldStorage.addWorlds(popularWorlds)
  }

  async getWorldsFromCache(): Promise<World[]> {
    return await this._worldStorage.getWorlds()
  }

  async getWorld(worldId: string): Promise<World> {
    const worldsFromStorage = await this._worldStorage.getWorlds()
    const worldFromStorage = worldsFromStorage.find(
      world => world.id === worldId
    )

    if (worldFromStorage !== undefined) return worldFromStorage

    const worldFromApi = await this._worldsApi.fetchWorld(worldId)
    await this._worldStorage.addWorld(worldFromApi)

    return worldFromApi
  }
}
