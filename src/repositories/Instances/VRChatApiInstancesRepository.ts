import { IInstancesRepository } from './IInstancesRepository'
import { InstanceApiResponse } from '../../types/ApiResponse'
import { InstanceLocation } from '../../types'
import { IVRChatApi } from '../../libs/VRChatApi/IVRChatApi'

export class VRChatApiInstancesRepository implements IInstancesRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  async fetchInstance(
    location: InstanceLocation
  ): Promise<InstanceApiResponse> {
    return await this._vrchatApi.getInstance({
      location,
    })
  }
}
