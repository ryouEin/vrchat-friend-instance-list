import { IWorldsApi } from '@/infras/Worlds/Api/IWorldsApi'
import { INetwork } from '@/libs/Network/INetwork'
import { World } from '@/types/ApiResponse'
import pMemoize from 'p-memoize'
import { VRC_API_URL } from '@/config/env'

// TODO SOON: URLの扱いを考える
const tmpFetchWorld = async (network: INetwork, worldId: string) => {
  return await network.get<World>(VRC_API_URL + `/api/1/worlds/${worldId}`)
}
const memoizedFetchWorld = pMemoize(tmpFetchWorld, {
  maxAge: 10000,
})

export class WorldsApi implements IWorldsApi {
  constructor(private readonly _network: INetwork) {}

  async fetchWorld(worldId: string): Promise<World> {
    return memoizedFetchWorld(this._network, worldId)
  }

  async fetchPopularWorlds(): Promise<World[]> {
    return await this._network.get<World[]>(VRC_API_URL + `/api/1/worlds`, {
      n: 100,
      sort: 'popularity',
      order: 'descending',
    })
  }
}
