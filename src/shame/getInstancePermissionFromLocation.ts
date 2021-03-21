import {
  InstanceLocation,
  InstancePermission,
  InstancePermissions,
} from '../types'
import { parseLocation } from './parseLocation'

export const getInstancePermissionFromLocation: (
  location: InstanceLocation
) => InstancePermission = (location) => {
  const { worldId, instanceId } = parseLocation(location)

  if (worldId === 'private') {
    return InstancePermissions.Private
  }

  if (instanceId === undefined) {
    throw new Error(`unknown location: ${location}`)
  }

  if (instanceId.includes('hidden')) {
    return InstancePermissions.FriendPlus
  }

  if (instanceId.includes('friends')) {
    return InstancePermissions.Friends
  }

  if (instanceId.includes('private')) {
    return instanceId.includes('canRequestInvite')
      ? InstancePermissions.InvitePlus
      : InstancePermissions.Invite
  }

  if (instanceId.includes('public') || !instanceId.includes('~')) {
    return InstancePermissions.Public
  }

  throw new Error(`unknown location: ${location}`)
}
