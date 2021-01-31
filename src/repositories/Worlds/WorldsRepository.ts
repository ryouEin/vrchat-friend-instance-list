// TODO: WorldsRepository系の命名規則考え直す
import { IWorldsRepository } from './IWorldsRepository'
import { IWorldsCache } from './WorldsCache/IWorldsCache'
import { IVRChatApi } from '../../libs/VRChatApi/IVRChatApi'
import { World } from '../../presentations/types'

const calcHardCapacity = (capacity: number) => {
  return capacity === 1 ? 1 : capacity * 2
}

export class WorldsRepository implements IWorldsRepository {
  constructor(
    private cacheWorldsRepository: IWorldsCache,
    private vrchatApi: IVRChatApi
  ) {}
  async fetchWorld(worldId: string): Promise<World> {
    // TODO: LocalStorageにWorld取得ごとにアクセスしてるのでパフォーマンスに大きい悪影響があるはず
    //  調整すること
    const worldsFromCache = await this.cacheWorldsRepository.getWorlds()
    const worldFromCache = worldsFromCache.find((world) => world.id === worldId)
    if (worldFromCache !== undefined) {
      return {
        ...worldFromCache,
        hardCapacity: calcHardCapacity(worldFromCache.capacity),
      }
    }

    const world = await this.vrchatApi.getWorld({ id: worldId })
    await this.cacheWorldsRepository.addWorld(world)
    return {
      ...world,
      hardCapacity: calcHardCapacity(world.capacity),
    }
  }
}
