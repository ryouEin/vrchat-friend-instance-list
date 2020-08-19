import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'
import { INetwork } from '@/libs/Network/INetwork'
import { World } from '@/types/ApiResponse'
import { VRC_API_URL } from '@/config/env'

export class NetworkWorldsRepository implements INetworkWorldsRepository {
  constructor(private readonly _network: INetwork) {}

  async fetchWorld(worldId: string): Promise<World> {
    // TODO SOON: URLの扱いを考える
    return await this._network.get<World>(
      VRC_API_URL + `/api/1/worlds/${worldId}`,
      {},
      true
    )
  }

  async fetchPopularWorlds(): Promise<World[]> {
    // TODO SOON: URLの扱いを考える
    return await this._network.get<World[]>(VRC_API_URL + `/api/1/worlds`, {
      n: 100,
      sort: 'popularity',
      order: 'descending',
    })
  }
}
