import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'
import { computed, ComputedRef, reactive } from '@vue/composition-api'
import { Favorite, FavoriteTag } from '@/types'

// TODO:
//  以下の内容に関して、再考
//  「前提」
//  ・FriendsStoreは「get favoriteByUserId()」に依存している
//  ・なので、FriendsStoreはのテストでインジェクションする必要があった
//  ・ただ、FriendsStoreは全体をinterface定義するのは大仰に感じた
//  ・なので、「get favoriteByUserId()」のみを切り出してinterface化した
//  「再考するべき点」
//  ・前述の「get favoriteByUserId()」のみinterface化した行為は正しいのか
//  ・正しいとして、こんなinterfaceの命名でいいのか
export interface ICanGetFavoriteByUserId {
  favoriteByUserId: ComputedRef<(userId: string) => Favorite | undefined>
}

type State = {
  favorites: Favorite[]
}
export const createFavoritesStore = (
  favoritesRepository: IFavoritesRepository
) => {
  const state = reactive<State>({
    favorites: [],
  })

  const favorites = computed<Favorite[]>(() => {
    return state.favorites
  })

  // TODO: computedが関数を返す場合、使用側でvalueを書かないといけないのが非常に違和感
  //  具体的には favoriteByUserId.value('usr_123') みたいにしないといけない
  //  改善方法がないか考える
  const favoriteByUserId = computed<(userId: string) => Favorite | undefined>(
    () => {
      return (userId: string) => {
        return favorites.value.find(favorite => favorite.favoriteId === userId)
      }
    }
  )

  const setFavoritesMutation = (favorites: Favorite[]) => {
    state.favorites = favorites
  }

  const addFavoritesMutation = (favorite: Favorite) => {
    state.favorites.push(favorite)
  }

  const deleteFavoritesMutation = (id: string) => {
    state.favorites = state.favorites.filter(favorite => favorite.id !== id)
  }

  const fetchFavoritesAction = async () => {
    const favorites = await favoritesRepository.fetchFavoritesAboutFriends()

    setFavoritesMutation(favorites)
  }

  const addFavoriteAction = async (userId: string, tag: FavoriteTag) => {
    const favorite = await favoritesRepository.addFavoriteAboutFriend(
      userId,
      tag
    )

    addFavoritesMutation(favorite)
  }

  const deleteFavoriteAction = async (id: string) => {
    await favoritesRepository.deleteFavoritesAboutFriends(id)

    deleteFavoritesMutation(id)
  }

  return {
    favorites,
    favoriteByUserId,
    fetchFavoritesAction,
    addFavoriteAction,
    deleteFavoriteAction,
  }
}
