/*
どこか適切な場所に置きたい
 */
import { InstanceLocation, InstancePermission } from '@/types'
import { parseLocation } from '@/shame/parseLocation'

export const getInstancePermissionFromLocation: (
  location: InstanceLocation
) => InstancePermission = location => {
  const { worldId, instanceId } = parseLocation(location)

  if (worldId === 'private') {
    return InstancePermission.Private
  }

  if (instanceId === undefined) {
    throw new Error(`unknown location: ${location}`)
  }

  if (instanceId.includes('hidden')) {
    return InstancePermission.FriendPlus
  }

  if (instanceId.includes('friends')) {
    return InstancePermission.Friends
  }

  if (instanceId.includes('public') || !instanceId.includes('~')) {
    return InstancePermission.Public
  }

  throw new Error(`unknown location: ${location}`)
}
