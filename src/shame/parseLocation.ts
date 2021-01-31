import { InstanceLocation } from '../types'

export const parseLocation = (location: InstanceLocation) => {
  const [worldId, instanceId] = location.split(':')
  return {
    worldId,
    instanceId,
  }
}
