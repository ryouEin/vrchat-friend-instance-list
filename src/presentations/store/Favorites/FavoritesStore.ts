import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'
import { computed, reactive } from '@vue/composition-api'
import { Favorite, FavoriteTag } from '@/types'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  favorites: Favorite[]
}
@MakeReferenceToWindowObjectInDevelopment('favoritesStore')
export class FavoritesStore {
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
