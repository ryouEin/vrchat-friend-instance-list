import { FetchFriendsFunction } from '@/infras/network/vrcApi'
import {
  fetchAllUsers,
  makePresentationUsers,
  markNewUser,
} from '@/store/module/UsersStore'

describe('fetchAllUsers', () => {
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
    const result = await fetchAllUsers(mockFetchFriends)
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

describe('makePresentationUsers', () => {
  const dummyFriend = {
    id: 'dummy',
    username: 'dummy',
    displayName: 'dummy',
    currentAvatarImageUrl: 'dummy',
    currentAvatarThumbnailImageUrl: 'dummy',
    location: 'dummy',
  }

  it('ApiResponse.UserをPresentation.Userに変換。isNewはfalseが設定される', () => {
    const result = makePresentationUsers(
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

describe('markNewUser', () => {
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
    const result = markNewUser(
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
