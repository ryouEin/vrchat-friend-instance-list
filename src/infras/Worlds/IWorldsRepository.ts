import { World } from '@/types/ApiResponse'

export interface IWorldsRepository {
  updateCacheByPopularWorlds(): Promise<void>
  getWorldsFromCache(): Promise<World[]>
  getWorld(worldId: string): Promise<World>
}
