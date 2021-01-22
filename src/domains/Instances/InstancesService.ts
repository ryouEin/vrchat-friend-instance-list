import { Friend, Instance, InstanceLocation, InstancePermission } from '@/types'
import uniqBy from 'lodash/uniqBy'
import { logger } from '@/singletonFactory'

const parseLocation = (location: InstanceLocation) => {
  const [worldId, instanceId] = location.split(':')
  return {
    worldId,
    instanceId,
  }
}

export const getInstancePermissionFromLocation: (
  location: InstanceLocation
) => InstancePermission = location => {
  const { worldId, instanceId } = parseLocation(location)

  if (worldId === 'private') {
    return InstancePermission.Private
  }

  if (instanceId === undefined) {
    logger.error(new Error(`unknown location: ${location}`))
    return InstancePermission.Unknown
  }

  if (instanceId.includes('hidden')) {
    return InstancePermission.FriendPlus
  }

  if (instanceId.includes('friends')) {
    return InstancePermission.Friends
  }

  if (instanceId.includes('private')) {
    return instanceId.includes('canRequestInvite')
      ? InstancePermission.InvitePlus
      : InstancePermission.Invite
  }

  if (instanceId.includes('public') || !instanceId.includes('~')) {
    return InstancePermission.Public
  }

  logger.error(new Error(`unknown location: ${location}`))
  return InstancePermission.Unknown
}

export function getOwnerIdFromLocation(
  location: InstanceLocation
): string | undefined {
  const regExResult = /\(.*?\)/.exec(location)
  if (regExResult === null) {
    return undefined
  }

  return regExResult[0].replace('(', '').replace(')', '')
}

export const getLocationsFromFriends: (
  friends: Friend[]
) => string[] = friends => {
  const locations = uniqBy(friends, 'location').map(friend => friend.location)

  const instancesWithoutPrivate = locations
    .filter(location => location !== 'private')
    .sort()
  const privateInstance = locations.filter(location => location === 'private')

  return instancesWithoutPrivate.concat(privateInstance)
}

export const makeInstancesFromLocations: (
  locations: InstanceLocation[]
) => Instance[] = locations => {
  return locations.map(location => {
    const { worldId } = parseLocation(location)

    return {
      worldId,
      location,
      permission: getInstancePermissionFromLocation(location),
      ownerId: getOwnerIdFromLocation(location),
      isWatching: false,
      notifyUserNum: 1,
    }
  })
}

export const applyOldInstanceStatesToNewInstances: (
  newInstances: Instance[],
  oldInstances: Instance[]
) => Instance[] = (newInstances, oldInstances) => {
  return newInstances.map(newInstance => {
    const oldInstance = oldInstances.find(
      oldInstance => oldInstance.location === newInstance.location
    )
    if (oldInstance === undefined) {
      return newInstance
    }

    return oldInstance
  })
}
