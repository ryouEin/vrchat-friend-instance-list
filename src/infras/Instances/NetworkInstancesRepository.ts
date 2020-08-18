import { IInstancesRepository } from '@/infras/Instances/IInstancesRepository'
import { InstanceInfo } from '@/types/ApiResponse'
import { InstanceLocation } from '@/types'
import { VRC_API_URL } from '@/config/env'
import { INetwork } from '@/libs/Network/INetwork'

export class NetworkInstancesRepository implements IInstancesRepository {
  constructor(private readonly _network: INetwork) {}

  async fetchInstance(location: InstanceLocation): Promise<InstanceInfo> {
    // TODO SOON: URLの扱いを考える
    return await this._network.get(VRC_API_URL + `/api/1/instances/${location}`)
  }
}
