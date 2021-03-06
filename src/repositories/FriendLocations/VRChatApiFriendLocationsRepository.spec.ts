import { IFriendsRepository } from '../Friends/IFriendsRepository'
import { UserApiResponse } from '../../types/ApiResponse'
import {
  locationsToLocationAndPermission,
  VRChatApiFriendLocationsRepository,
} from './VRChatApiFriendLocationsRepository'
import { FriendLocation } from './IFriendLocationsRepository'
import { InstancePermissions } from '../../types'

class MockFriendsRepository implements IFriendsRepository {
  public friends: UserApiResponse[] = []

  async fetchAllFriends(): Promise<UserApiResponse[]> {
    return this.friends
  }
}

const friendDummyData: UserApiResponse = {
  id: 'usr_01',
  displayName: 'display name',
  username: 'user name',
  currentAvatarThumbnailImageUrl: 'https://example.com/sample.jpg',
  currentAvatarImageUrl: 'https://example.com/sample.jpg',
  location: 'wrld_01:1',
}

describe('locationsToLocationAndPermission', () => {
  const publicLocation01 = 'public:1'
  const publicLocation02 = 'public:2'
  const offlineLocation = 'offline'
  const unknownLocation = 'wrld_010:unknown~unknown'

  it('locationの配列が、locationとpermissionのオブジェクトの配列として返却される', () => {
    const result = locationsToLocationAndPermission([
      publicLocation01,
      publicLocation02,
    ])

    expect(result).toEqual([
      {
        location: publicLocation01,
        permission: InstancePermissions.Public,
      },
      {
        location: publicLocation02,
        permission: InstancePermissions.Public,
      },
    ])
  })

  it('offlineなどの例外的なlocationが来た場合、それは無視される', () => {
    const result = locationsToLocationAndPermission([
      publicLocation01,
      offlineLocation,
      publicLocation02,
      unknownLocation,
    ])

    expect(result).toEqual([
      {
        location: publicLocation01,
        permission: InstancePermissions.Public,
      },
      {
        location: publicLocation02,
        permission: InstancePermissions.Public,
      },
    ])
  })
})

describe('fetchFriendLocations', () => {
  it('通常パターン', async () => {
    const friendsRepository = new MockFriendsRepository()
    const publicLocation = 'wrld_01:1'
    const friendsLocation = 'wrld_02:123~friends(usr_0)~nonce(hogehoge)'
    const privateLocation = 'private'
    const user01 = {
      ...friendDummyData,
      id: 'usr_01',
      location: publicLocation,
    }
    const user02 = {
      ...friendDummyData,
      id: 'usr_02',
      location: friendsLocation,
    }
    const user03 = {
      ...friendDummyData,
      id: 'usr_03',
      location: privateLocation,
    }
    const user04 = {
      ...friendDummyData,
      id: 'usr_04',
      location: friendsLocation,
    }
    friendsRepository.friends = [user01, user02, user03, user04]

    const friendLocationsRepository = new VRChatApiFriendLocationsRepository(
      friendsRepository
    )
    const result = await friendLocationsRepository.fetchFriendLocations()
    const expectedValue: FriendLocation[] = [
      {
        id: publicLocation,
        instance: {
          id: publicLocation,
          permission: InstancePermissions.Public,
          worldId: 'wrld_01',
          ownerId: undefined,
        },
        friends: [
          {
            ...user01,
            canJoin: true,
          },
        ],
      },
      {
        id: friendsLocation,
        instance: {
          id: friendsLocation,
          permission: InstancePermissions.Friends,
          worldId: 'wrld_02',
          ownerId: 'usr_0',
        },
        friends: [
          {
            ...user02,
            canJoin: true,
          },
          {
            ...user04,
            canJoin: true,
          },
        ],
      },
      {
        id: privateLocation,
        friends: [
          {
            ...user03,
            canJoin: false,
          },
        ],
      },
    ]

    expect(result).toEqual(expectedValue)
  })
})
