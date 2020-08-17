import { InstanceLocation } from '@/types'
import { InstanceInfo } from '@/types/ApiResponse'

export interface IInstancesApi {
  fetchInstance(location: InstanceLocation): Promise<InstanceInfo>
}
