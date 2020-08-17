import { IInstancesRepository } from '@/infras/Instances/IInstancesRepository'
import { IInstancesApi } from '@/infras/Instances/Api/IInstancesApi'
import { InstanceInfo } from '@/types/ApiResponse'
import { InstanceLocation } from '@/types'

export class InstancesRepository implements IInstancesRepository {
  constructor(private readonly _instancesApi: IInstancesApi) {}

  async fetchInstance(location: InstanceLocation): Promise<InstanceInfo> {
    return await this._instancesApi.fetchInstance(location)
  }
}
