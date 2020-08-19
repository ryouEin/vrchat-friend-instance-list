import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'
import { INetwork } from '@/libs/Network/INetwork'
import { WorldApiResponse } from '@/types/ApiResponse'
import { VRC_API_URL } from '@/config/env'

export class NetworkWorldsRepository implements INetworkWorldsRepository {
  constructor(private readonly _network: INetwork) {}

  async fetchWorld(worldId: string): Promise<WorldApiResponse> {
    // TODO SOON: URLの扱いを考える
    // TODO SOON: Networkから取得したデータのバリデーションして型アサーション外す
    return (await this._network.get(VRC_API_URL + `/api/1/worlds/${worldId}`, {
      throttle: true,
    })) as WorldApiResponse
  }

  async fetchPopularWorlds(): Promise<WorldApiResponse[]> {
    // TODO SOON: URLの扱いを考える
    // TODO SOON: Networkから取得したデータのバリデーションして型アサーション外す
    return (await this._network.get(VRC_API_URL + `/api/1/worlds`, {
      params: {
        n: 100,
        sort: 'popularity',
        order: 'descending',
      },
    })) as WorldApiResponse[]
  }
}
