import {
  Friend,
  FriendLocation,
  IFriendLocationsRepository,
} from './IFriendLocationsRepository'
import { IFriendsRepository } from '../Friends/IFriendsRepository'
import { UserApiResponse } from '../../types/ApiResponse'
import {
  InstanceLocation,
  InstancePermission,
  InstancePermissions,
} from '../../types'
import { Instance } from '../../presentations/types'
import { parseLocation } from '../../shame/parseLocation'
import { getInstancePermissionFromLocation } from '../../shame/getInstancePermissionFromLocation'
import { getOwnerIdFromLocation } from '../../shame/getOwnerIdFromLocation'
import { getRegionFromLocation } from '../../shame/getRegionFromLocation'
import { logger } from '../../factory/logger'
import { uniqWith } from '../../libs/Utils'

const getLocationsFromFriends: (friends: UserApiResponse[]) => string[] = (
  friends
) => {
  const locations = uniqWith(friends, (a, b) => a.location === b.location).map(
    (friend) => friend.location
  )

  const instancesWithoutPrivate = locations
    .filter((location) => location !== 'private')
    .sort()
  const privateInstance = locations.filter((location) => location === 'private')

  return instancesWithoutPrivate.concat(privateInstance)
}

export const locationsToLocationAndPermission = (
  locations: InstanceLocation[]
) => {
  return locations.reduce<
    { location: InstanceLocation; permission: InstancePermission }[]
  >((acc, location) => {
    try {
      const permission: InstancePermission = getInstancePermissionFromLocation(
        location
      )

      if (permission === InstancePermissions.Offline) return acc

      return acc.concat({
        location,
        permission,
      })
    } catch (e) {
      if (e instanceof Error) {
        logger.error(`unknown location: ${location}`)
      }

      return acc
    }
  }, [])
}

// TODO: 要リファクタ。friendsをfetchしているだけじゃなく結構重要な他の処理も入っているのにfetchFriendsという名前は微妙
const fetchFriends = async (
  friendsRepository: IFriendsRepository
): Promise<UserApiResponse[]> => {
  const friends = await friendsRepository.fetchAllFriends()

  return friends.map((friend) => {
    if (friend.location !== 'traveling') return friend

    if (friend.travelingToLocation === undefined) {
      logger.error('travelingToLocationがundefinedなケースが存在します。')
    }
    return {
      ...friend,
      location: friend.travelingToLocation ?? '',
    }
  })
}

export class VRChatApiFriendLocationsRepository
  implements IFriendLocationsRepository {
  constructor(private friendsRepository: IFriendsRepository) {}

  async fetchFriendLocations(): Promise<FriendLocation[]> {
    const friends = await fetchFriends(this.friendsRepository)
    const locations = getLocationsFromFriends(friends)
    const locationAndPermissionArray = locationsToLocationAndPermission(
      locations
    )

    return locationAndPermissionArray.map((locationAndPermission) => {
      const { location, permission } = locationAndPermission
      const isPrivate = permission === InstancePermissions.Private
      const friendsInLocation: Friend[] = friends
        .filter((friend) => friend.location === location)
        .map((friend) => {
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
        const { worldId } = parseLocation(location)
        const ownerId = getOwnerIdFromLocation(location)

        const instance: Instance = {
          id: location,
          permission,
          worldId,
          ownerId,
          region: getRegionFromLocation(location),
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
