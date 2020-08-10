import { FetchFriendsFunction } from '@/infras/network/vrcApi'
import { fetchAllFriends } from '@/store/module/FriendsStore/functions'

describe('fetchAllFriends', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
  }
  const mockFetchFriends: FetchFriendsFunction = async page => {
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

  it('全ユーザーを取得し、重複は除去される', async () => {
    const result = await fetchAllFriends(mockFetchFriends)
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
