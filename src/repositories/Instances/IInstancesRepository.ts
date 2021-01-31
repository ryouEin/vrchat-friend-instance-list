import { InstanceLocation } from '../../types'
import { InstanceApiResponse } from '../../types/ApiResponse'

export interface IInstancesRepository {
  fetchInstance(location: InstanceLocation): Promise<InstanceApiResponse>
}
