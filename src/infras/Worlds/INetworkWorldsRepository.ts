import { WorldApiResponse } from '@/types/ApiResponse'

export interface INetworkWorldsRepository {
  fetchWorld(worldId: string): Promise<WorldApiResponse>

  fetchPopularWorlds(): Promise<WorldApiResponse[]>
}
