import { IFriendsApi } from '@/infras/Friends/Api/IFriendsApi'
import { Favorite, User } from '@/types/ApiResponse'
import { FriendsRepository } from '@/infras/Friends/FriendsRepository'

describe('fetchAllFriends', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
  }
  class MockFriendsApi implements IFriendsApi {
    async fetchFriends(page: number): Promise<User[]> {
      if (page === 0) {
        return [
          {
            ...dummyFriend,
            id: 'usr_0',
          },
        ]
      }
      if (page === 1) {
        return [
          {
            ...dummyFriend,
            id: 'usr_1',
          },
        ]
      }
      if (page === 2) {
        return [
          {
            ...dummyFriend,
            id: 'usr_1',
          },
        ]
      }
      if (page === 3) {
        return [
          {
            ...dummyFriend,
            id: 'usr_2',
          },
        ]
      }
      return []
    }

    async fetchFavoritesAboutFriend(): Promise<Favorite[]> {
      return []
    }
  }

  it('全ユーザーを取得し、重複は除去される', async () => {
    const mockFriendsApi = new MockFriendsApi()
    const friendsRepository = new FriendsRepository(mockFriendsApi)
    const result = await friendsRepository.fetchAllFriends()

    expect(result).toEqual([
      {
        ...dummyFriend,
        id: 'usr_0',
      },
      {
        ...dummyFriend,
        id: 'usr_1',
      },
      {
        ...dummyFriend,
        id: 'usr_2',
      },
    ])
  })
})
