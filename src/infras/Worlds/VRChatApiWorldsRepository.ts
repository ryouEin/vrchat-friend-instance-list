import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'
import { WorldApiResponse } from '@/types/ApiResponse'
import { IVRChatApi } from '@/libs/VRChatApi/IVRChatApi'

export class VRChatApiWorldsRepository implements INetworkWorldsRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  async fetchWorld(worldId: string): Promise<WorldApiResponse> {
    return await this._vrchatApi.getWorld({ id: worldId })
  }

  async fetchPopularWorlds(): Promise<WorldApiResponse[]> {
    return await this._vrchatApi.listWorlds({
      n: 100,
      sort: 'popularity',
      order: 'descending',
    })
  }
}
