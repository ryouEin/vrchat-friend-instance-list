import {
  Friend,
  FriendLocation,
  IFriendLocationsRepository,
} from './IFriendLocationsRepository'
import { IFriendsRepository } from '../Friends/IFriendsRepository'
import uniqBy from 'lodash/uniqBy'
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

const getLocationsFromFriends: (friends: UserApiResponse[]) => string[] = (
  friends
) => {
  const locations = uniqBy(friends, 'location').map((friend) => friend.location)

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
    let permission: InstancePermission | undefined = undefined
    try {
      permission = getInstancePermissionFromLocation(location)
      return acc.concat({
        location,
        permission,
      })
    } catch {
      // TODO: 未知のlocationが来た際に、Sentryに通知を送りたい
      //  ただ、'offline' は無視したい
      //  「permission !== 'offline'」みたいなコードは書きたくないので、どうすればいいか考える
      return acc
    }
  }, [])
}

export class VRChatApiFriendLocationsRepository
  implements IFriendLocationsRepository {
  constructor(private friendsRepository: IFriendsRepository) {}

  async fetchFriendLocations(): Promise<FriendLocation[]> {
    const friends = await this.friendsRepository.fetchAllFriends()
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
