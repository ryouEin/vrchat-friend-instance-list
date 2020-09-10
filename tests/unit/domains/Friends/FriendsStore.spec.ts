import { FavoriteApiResponse, UserApiResponse } from '@/types/ApiResponse'
import { Favorite, FavoriteTag, Friend } from '@/types'
import { FriendsStore } from '@/domains/Friends/FriendsStore'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'
import { ICanGetFavoriteByUserId } from '@/domains/Favorites/FavoritesStore'

const generateDummyFriends = (count: number) => {
  const dummyFriends: UserApiResponse[] = []

  for (let index = 0; index < count; index++) {
    dummyFriends.push({
      id: `${index}`,
      username: `username ${index}`,
      displayName: `displayName ${index}`,
      currentAvatarImageUrl: ``,
      currentAvatarThumbnailImageUrl: ``,
      location: ``,
    })
  }

  return dummyFriends
}

class MockFriendsRepository implements IFriendsRepository {
  constructor(public friends: UserApiResponse[]) {}

  async fetchAllFriends(): Promise<UserApiResponse[]> {
    return this.friends
  }
}

class MockFavoriteStore implements ICanGetFavoriteByUserId {
  constructor(public favorites: Favorite[]) {}

  favoriteByUserId(userId: string): Favorite | undefined {
    return this.favorites.find(favorite => favorite.favoriteId === userId)
  }
}

// TODO SOON: push前に修正すること
// eslint-disable-next-line
// @ts-ignore
class MockFavoritesRepository implements IFavoritesRepository {
  constructor(public favorites: FavoriteApiResponse[]) {}

  async fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]> {
    return this.favorites
  }
}

describe('fetchFriends', () => {
  it('APIから取得したフレンドデータを取得できる', async () => {
    const dummyData: UserApiResponse[] = generateDummyFriends(310)
    const mockFriendsRepository = new MockFriendsRepository(dummyData)
    const mockFavoriteStore = new MockFavoriteStore([])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoriteStore
    )

    await friendsStore.fetchFriendsAction()

    expect(friendsStore.friends).toEqual(
      dummyData.map(item => ({
        ...item,
        isNew: false,
        isFavorited: false,
      }))
    )
  })

  it('Favorite登録されているユーザーはisFavoritedがtrueになる', async () => {
    const dummyData: UserApiResponse[] = generateDummyFriends(310)
    const mockFriendsRepository = new MockFriendsRepository(dummyData)
    const mockFavoriteStore = new MockFavoriteStore([
      {
        id: 'dummy',
        favoriteId: '10',
        tags: [],
        type: 'friend',
      },
      {
        id: 'dummy',
        favoriteId: '123',
        tags: [],
        type: 'friend',
      },
    ])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoriteStore
    )

    await friendsStore.fetchFriendsAction()

    expect(friendsStore.friends).toEqual(
      dummyData.map<Friend>(item => {
        return {
          ...item,
          isNew: false,
          isFavorited: item.id === '10' || item.id === '123',
        }
      })
    )
  })

  it('複数回呼ばれた場合、いなくなったユーザーのデータは消え、新しくログインしたユーザーはisNewがtrueになる', async () => {
    const dummyData: UserApiResponse[] = generateDummyFriends(310)
    const mockFriendsRepository = new MockFriendsRepository(
      dummyData.slice(0, 200)
    )
    const mockFavoriteStore = new MockFavoriteStore([])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoriteStore
    )

    await friendsStore.fetchFriendsAction()

    mockFriendsRepository.friends = dummyData.slice(100, 400)

    await friendsStore.fetchFriendsAction()

    expect(friendsStore.friends).toEqual(
      dummyData.slice(100, 400).map<Friend>(item => {
        return {
          ...item,
          isNew: Number(item.id) >= 200,
          isFavorited: false,
        }
      })
    )
  })
})
