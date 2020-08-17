import { IInstancesApi } from '@/infras/Instances/Api/IInstancesApi'
import { InstanceInfo } from '@/types/ApiResponse'
import { InstanceLocation } from '@/types'
import { INetwork } from '@/libs/Network/INetwork'
import { VRC_API_URL } from '@/config/env'

export class InstancesApi implements IInstancesApi {
  constructor(private readonly _network: INetwork) {}

  async fetchInstance(location: InstanceLocation): Promise<InstanceInfo> {
    // TODO SOON: URLの扱いを考える
    return await this._network.get(VRC_API_URL + `/api/1/instances/${location}`)
  }
}