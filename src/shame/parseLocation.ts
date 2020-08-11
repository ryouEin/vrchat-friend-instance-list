/*
どこか適切な場所に置きたい
 */
import { InstanceLocation } from '@/types'

export const parseLocation = (location: InstanceLocation) => {
  const [worldId, instanceId] = location.split(':')
  return {
    worldId,
    instanceId,
  }
}
