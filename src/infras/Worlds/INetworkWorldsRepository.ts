import { World } from '@/types/ApiResponse'

export interface INetworkWorldsRepository {
  fetchWorld(worldId: string): Promise<World>

  fetchPopularWorlds(): Promise<World[]>
}
