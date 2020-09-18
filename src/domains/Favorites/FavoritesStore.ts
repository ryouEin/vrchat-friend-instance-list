import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'
import { computed, ComputedRef, reactive } from '@vue/composition-api'
import { Favorite, FavoriteTag } from '@/types'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

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
@MakeReferenceToWindowObjectInDevelopment('favoritesStore')
export class FavoritesStore implements ICanGetFavoriteByUserId {
  constructor(private readonly _favoritesRepository: IFavoritesRepository) {}

  private readonly _state = reactive<State>({
    favorites: [],
  })

  readonly favorites = computed<Favorite[]>(() => {
    return this._state.favorites
  })

  // TODO: computedが関数を返す場合、使用側でvalueを書かないといけないのが非常に違和感
  //  具体的には favoriteByUserId.value('usr_123') みたいにしないといけない
  //  改善方法がないか考える
  readonly favoriteByUserId = computed<
    (userId: string) => Favorite | undefined
  >(() => {
    return (userId: string) => {
      return this._state.favorites.find(
        favorite => favorite.favoriteId === userId
      )
    }
  })

  @LogBeforeAfter('_state')
  private setFavoritesMutation(favorites: Favorite[]) {
    this._state.favorites = favorites
  }

  @LogBeforeAfter('_state')
  private addFavoritesMutation(favorite: Favorite) {
    this._state.favorites.push(favorite)
  }

  @LogBeforeAfter('_state')
  private deleteFavoritesMutation(id: string) {
    this._state.favorites = this._state.favorites.filter(
      favorite => favorite.id !== id
    )
  }

  async fetchFavoritesAction() {
    const favorites = await this._favoritesRepository.fetchFavoritesAboutFriends()

    this.setFavoritesMutation(favorites)
  }

  async addFavoriteAction(userId: string, tag: FavoriteTag) {
    const favorite = await this._favoritesRepository.addFavoriteAboutFriend(
      userId,
      tag
    )

    this.addFavoritesMutation(favorite)
  }

  async deleteFavoriteAction(id: string) {
    await this._favoritesRepository.deleteFavoritesAboutFriends(id)

    this.deleteFavoritesMutation(id)
  }
}
