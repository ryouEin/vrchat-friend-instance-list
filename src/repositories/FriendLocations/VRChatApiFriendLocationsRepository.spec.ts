import { IFriendsRepository } from '../Friends/IFriendsRepository'
import { UserApiResponse } from '../../types/ApiResponse'
import { VRChatApiFriendLocationsRepository } from './VRChatApiFriendLocationsRepository'
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
