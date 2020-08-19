import { UserApiResponse } from '@/types/ApiResponse'
import { NetworkFriendsRepository } from '@/infras/Friends/NetworkFriendsRepository'
import { INetwork, NetworkOptions } from '@/libs/Network/INetwork'
import { VRC_API_URL } from '@/config/env'

describe('fetchAllFriends', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
  }

  class MockNetwork implements INetwork {
    async get(url: string, options: NetworkOptions): Promise<unknown> {
      if (url === VRC_API_URL + '/api/1/favorites') {
        return []
      }

      const params = options.params
      if (params === undefined) {
        throw new Error('params is undefined')
      }

      const page = (params.offset as number) / 100
      let out: UserApiResponse[] = []
      if (page === 0) {
        out = [
          {
            ...dummyFriend,
            id: 'usr_0',
          },
        ]
      }
      if (page === 1) {
        out = [
          {
            ...dummyFriend,
            id: 'usr_1',
          },
        ]
      }
      if (page === 2) {
        out = [
          {
            ...dummyFriend,
            id: 'usr_1',
          },
        ]
      }
      if (page === 3) {
        out = [
          {
            ...dummyFriend,
            id: 'usr_2',
          },
        ]
      }

      return out
    }
  }

  it('全ユーザーを取得し、重複は除去される', async () => {
    const mockNetwork = new MockNetwork()
    const friendsRepository = new NetworkFriendsRepository(mockNetwork)
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
