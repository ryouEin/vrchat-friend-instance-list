import { World } from '@/types/ApiResponse'

export interface IWorldsApi {
  fetchWorld(worldId: string): Promise<World>

  fetchPopularWorlds(): Promise<World[]>
}
