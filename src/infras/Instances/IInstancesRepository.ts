import { InstanceLocation } from '@/types'
import { InstanceInfo } from '@/types/ApiResponse'

export interface IInstancesRepository {
  fetchInstance(location: InstanceLocation): Promise<InstanceInfo>
}
