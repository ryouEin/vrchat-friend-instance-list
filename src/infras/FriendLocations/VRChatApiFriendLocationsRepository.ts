// TODO: テスト書く
import {
  Friend,
  FriendLocation,
  IFriendLocationsRepository,
  Instance,
} from '@/infras/FriendLocations/IFriendLocationsRepository'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import uniqBy from 'lodash/uniqBy'
import { UserApiResponse } from '@/types/ApiResponse'
import { InstanceLocation, InstancePermission } from '@/types'
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
    return InstancePermission.Private
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

export const getLocationsFromFriends: (
  friends: UserApiResponse[]
) => string[] = friends => {
  const locations = uniqBy(friends, 'location').map(friend => friend.location)

  const instancesWithoutPrivate = locations
    .filter(location => location !== 'private')
    .sort()
  const privateInstance = locations.filter(location => location === 'private')

  return instancesWithoutPrivate.concat(privateInstance)
}

export function getWorldIdFromLocation(location: InstanceLocation): string {
  const { worldId } = parseLocation(location)

  return worldId
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

export class VRChatApiFriendLocationsRepository
  implements IFriendLocationsRepository {
  constructor(private friendsRepository: IFriendsRepository) {}
  async fetchFriendLocations(): Promise<FriendLocation[]> {
    const friends = await this.friendsRepository.fetchAllFriends()
    const locations = getLocationsFromFriends(friends)

    return locations.map(location => {
      const permission = getInstancePermissionFromLocation(location)
      const isPrivate = permission === InstancePermission.Private
      const friendsInLocation: Friend[] = friends
        .filter(friend => friend.location === location)
        .map(friend => {
          return {
            ...friend,
            canJoin: !isPrivate,
          }
        })

      if (isPrivate) {
        return {
          id: location,
          friends: friendsInLocation,
        }
      } else {
        const worldId = getWorldIdFromLocation(location)
        const ownerId = getOwnerIdFromLocation(location)

        const instance: Instance = {
          id: location,
          permission,
          worldId,
          ownerId,
        }
        return {
          id: location,
          instance,
          friends: friendsInLocation,
        }
      }
    })
  }
}
