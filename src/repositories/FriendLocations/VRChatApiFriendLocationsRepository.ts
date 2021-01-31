import {
  Friend,
  FriendLocation,
  IFriendLocationsRepository,
} from './IFriendLocationsRepository'
import { IFriendsRepository } from '../Friends/IFriendsRepository'
import uniqBy from 'lodash/uniqBy'
import { UserApiResponse } from '../../types/ApiResponse'
import { InstancePermissions } from '../../types'
import { Instance } from '../../presentations/types'
import { parseLocation } from '../../shame/parseLocation'
import { getInstancePermissionFromLocation } from '../../shame/getInstancePermissionFromLocation'
import { getOwnerIdFromLocation } from '../../shame/getOwnerIdFromLocation'

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

export class VRChatApiFriendLocationsRepository
  implements IFriendLocationsRepository {
  constructor(private friendsRepository: IFriendsRepository) {}

  async fetchFriendLocations(): Promise<FriendLocation[]> {
    const friends = await this.friendsRepository.fetchAllFriends()
    const locations = getLocationsFromFriends(friends)

    return locations.map((location) => {
      const permission = getInstancePermissionFromLocation(location)
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
