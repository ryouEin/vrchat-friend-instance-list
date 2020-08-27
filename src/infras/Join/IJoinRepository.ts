import { InstanceLocation } from '@/types'

export interface IJoinRepository {
  inviteMe(location: InstanceLocation): Promise<void>
}
