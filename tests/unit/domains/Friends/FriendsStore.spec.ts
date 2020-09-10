import { FavoriteApiResponse, UserApiResponse } from '@/types/ApiResponse'
import { Friend } from '@/types'
import { FriendsStore } from '@/domains/Friends/FriendsStore'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'

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
    const mockFavoritesRepository = new MockFavoritesRepository([])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoritesRepository
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
    const mockFavoritesRepository = new MockFavoritesRepository([
      {
        favoriteId: '10',
      },
      {
        favoriteId: '123',
      },
    ])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoritesRepository
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
    const mockFavoritesRepository = new MockFavoritesRepository([])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoritesRepository
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
