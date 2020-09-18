import { MockFavoritesRepository } from '../../../mock/MockFavoritesRepository'
import { Favorite } from '@/types'
import VueCompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'
import { FavoritesStore } from '@/domains/Favorites/FavoritesStore'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('fetchFavoritesAction', () => {
  it('取得したデータがfavoritesに格納される', async () => {
    const dummyFavorites: Favorite[] = [
      {
        id: 'fvrt_1',
        favoriteId: 'usr_1',
        type: 'friend',
        tags: ['group_0'],
      },
      {
        id: 'fvrt_2',
        favoriteId: 'usr_2',
        type: 'friend',
        tags: ['group_1'],
      },
    ]
    const mockFavoritesRepository = new MockFavoritesRepository(dummyFavorites)
    const favoriteStore = new FavoritesStore(mockFavoritesRepository)

    await favoriteStore.fetchFavoritesAction()

    expect(favoriteStore.favorites.value).toEqual(dummyFavorites)
  })

  it('以前のデータは破棄される（マージはされない）', async () => {
    const dummyFavorites1: Favorite[] = [
      {
        id: 'fvrt_1',
        favoriteId: 'usr_1',
        type: 'friend',
        tags: ['group_0'],
      },
      {
        id: 'fvrt_2',
        favoriteId: 'usr_2',
        type: 'friend',
        tags: ['group_1'],
      },
    ]
    const mockFavoritesRepository = new MockFavoritesRepository(dummyFavorites1)
    const favoriteStore = new FavoritesStore(mockFavoritesRepository)

    await favoriteStore.fetchFavoritesAction()

    expect(favoriteStore.favorites.value).toEqual(dummyFavorites1)

    const dummyFavorites2: Favorite[] = [
      {
        id: 'fvrt_3',
        favoriteId: 'usr_3',
        type: 'friend',
        tags: ['group_2'],
      },
    ]
    mockFavoritesRepository.favorites = dummyFavorites2

    await favoriteStore.fetchFavoritesAction()

    expect(favoriteStore.favorites.value).toEqual(dummyFavorites2)
  })
})

describe('addFavoriteAction', () => {
  it('指定したユーザーがfavoritesに追加される', async () => {
    const mockFavoritesRepository = new MockFavoritesRepository([])
    const favoriteStore = new FavoritesStore(mockFavoritesRepository)

    await favoriteStore.addFavoriteAction('usr_3', 'group_2')

    expect(
      favoriteStore.favorites.value.find(favorite => {
        return (
          favorite.favoriteId === 'usr_3' && favorite.tags.includes('group_2')
        )
      })
    ).not.toBeUndefined()
  })
})

describe('deleteFavoriteAction', () => {
  it('指定したidのfavoriteがfavoritesから取り除かれる', async () => {
    const dummyFavorites: Favorite[] = [
      {
        id: 'fvrt_1',
        favoriteId: 'usr_1',
        type: 'friend',
        tags: ['group_0'],
      },
      {
        id: 'fvrt_2',
        favoriteId: 'usr_2',
        type: 'friend',
        tags: ['group_1'],
      },
    ]
    const mockFavoritesRepository = new MockFavoritesRepository(dummyFavorites)
    const favoriteStore = new FavoritesStore(mockFavoritesRepository)

    await favoriteStore.fetchFavoritesAction()

    const targetFavorite = favoriteStore.favoriteByUserId.value('usr_1')
    await favoriteStore.deleteFavoriteAction(targetFavorite!.id)

    expect(favoriteStore.favorites.value).toEqual([
      {
        id: 'fvrt_2',
        favoriteId: 'usr_2',
        type: 'friend',
        tags: ['group_1'],
      },
    ])
  })
})
