import { FetchFriendsFunction } from '@/infras/network/vrcApi'
import {
  fetchAllFriends,
  makePresentationFriends,
  markNewFriends,
} from '@/presentations/store/module/FriendsStore/functions'

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

describe('makePresentationFriends', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
  }

  it('ApiResponse.UserをPresentation.Friendに変換。isNewはfalseが設定される', () => {
    const result = makePresentationFriends(
      [
        {
          ...dummyFriend,
          id: 'usr_0',
        },
        {
          ...dummyFriend,
          id: 'usr_1',
        },
      ],
      [
        {
          favoriteId: 'usr_1',
        },
      ]
    )

    expect(result).toEqual([
      {
        ...dummyFriend,
        id: 'usr_0',
        isNew: false,
        isFavorited: false,
      },
      {
        ...dummyFriend,
        id: 'usr_1',
        isNew: false,
        isFavorited: true,
      },
    ])
  })
})

describe('markNewFriends', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
    isNew: false,
    isFavorited: false,
  }

  it('新規ログインユーザーはisNewがtrueとなる', () => {
    const result = markNewFriends(
      [
        {
          ...dummyFriend,
          id: 'usr_0',
        },
        {
          ...dummyFriend,
          id: 'usr_1',
        },
      ],
      [
        {
          ...dummyFriend,
          id: 'usr_1',
        },
        {
          ...dummyFriend,
          id: 'usr_2',
        },
      ]
    )

    expect(result).toEqual([
      {
        ...dummyFriend,
        id: 'usr_1',
        isNew: false,
      },
      {
        ...dummyFriend,
        id: 'usr_2',
        isNew: true,
      },
    ])
  })
})
