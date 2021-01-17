import { UserApiResponse } from '@/types/ApiResponse'
import { Favorite, Friend } from '@/types'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import VueCompositionApi, { computed, reactive } from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { FriendsStore } from '@/domains/Friends/FriendsStore'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

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

const createMockFavoritesStore = (initialFavorites: Favorite[]) => {
  const state = reactive<{ favorites: Favorite[] }>({
    favorites: [],
  })

  const favoriteByUserId = computed(() => {
    return (userId: string) => {
      return state.favorites.find(favorite => favorite.favoriteId === userId)
    }
  })

  state.favorites = initialFavorites

  return {
    favoriteByUserId,
  }
}

describe('fetchFriends', () => {
  it('APIから取得したフレンドデータを取得できる', async () => {
    const dummyData: UserApiResponse[] = generateDummyFriends(310)
    const mockFriendsRepository = new MockFriendsRepository(dummyData)
    const mockFavoriteStore = createMockFavoritesStore([])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoriteStore
    )

    await friendsStore.fetchFriendsAction()

    expect(friendsStore.friends.value).toEqual(
      dummyData.map(item => ({
        ...item,
        isNew: false,
      }))
    )
  })

  it('Favorite登録されているユーザーはisFavoritedがtrueになる', async () => {
    const dummyData: UserApiResponse[] = generateDummyFriends(310)
    const mockFriendsRepository = new MockFriendsRepository(dummyData)
    const favoriteId10: Favorite = {
      id: 'dummy',
      favoriteId: '10',
      tags: [],
      type: 'friend',
    }
    const favoriteId123: Favorite = {
      id: 'dummy',
      favoriteId: '123',
      tags: [],
      type: 'friend',
    }

    const mockFavoriteStore = createMockFavoritesStore([
      favoriteId10,
      favoriteId123,
    ])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoriteStore
    )

    await friendsStore.fetchFriendsAction()

    expect(friendsStore.friends.value).toEqual(
      dummyData.map<Friend>(item => {
        const favorite = (() => {
          if (item.id === '10') return favoriteId10
          if (item.id === '123') return favoriteId123

          return undefined
        })()

        return {
          ...item,
          isNew: false,
          favorite,
        }
      })
    )
  })

  it('複数回呼ばれた場合、いなくなったユーザーのデータは消え、新しくログインしたユーザーはisNewがtrueになる', async () => {
    const dummyData: UserApiResponse[] = generateDummyFriends(310)
    const mockFriendsRepository = new MockFriendsRepository(
      dummyData.slice(0, 200)
    )
    const mockFavoriteStore = createMockFavoritesStore([])
    const friendsStore = new FriendsStore(
      mockFriendsRepository,
      mockFavoriteStore
    )

    await friendsStore.fetchFriendsAction()

    mockFriendsRepository.friends = dummyData.slice(100, 400)

    await friendsStore.fetchFriendsAction()

    expect(friendsStore.friends.value).toEqual(
      dummyData.slice(100, 400).map<Friend>(item => {
        return {
          ...item,
          isNew: Number(item.id) >= 200,
        }
      })
    )
  })
})
