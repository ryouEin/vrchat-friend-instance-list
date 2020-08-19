import { IInstancesRepository } from '@/infras/Instances/IInstancesRepository'
import { InstanceApiResponse } from '@/types/ApiResponse'
import { InstanceLocation } from '@/types'
import { INetwork } from '@/libs/Network/INetwork'
import { VrcApiUrl } from '@/config/url'

export class NetworkInstancesRepository implements IInstancesRepository {
  constructor(private readonly _network: INetwork) {}

  async fetchInstance(
    location: InstanceLocation
  ): Promise<InstanceApiResponse> {
    // TODO SOON: Networkから取得したデータのバリデーションして型アサーション外す
    return (await this._network.get(
      VrcApiUrl.getFetchInstanceUrl(location)
    )) as InstanceApiResponse
  }
}
