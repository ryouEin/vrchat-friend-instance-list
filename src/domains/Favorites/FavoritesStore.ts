import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { Favorite } from '@/types'
import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'

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
  favoriteByUserId: (userId: string) => Favorite | undefined
}

type State = {
  favorites: Favorite[]
}
@MakeReferenceToWindowObjectInDevelopment('favoritesStore')
export class FavoritesStore implements ICanGetFavoriteByUserId {
  private _state = Vue.observable<State>({
    favorites: [],
  })

  constructor(private readonly _favoritesRepository: IFavoritesRepository) {}

  get favorites() {
    return this._state.favorites
  }

  get favoriteByUserId() {
    return (userId: string) => {
      return this.favorites.find(favorite => favorite.favoriteId === userId)
    }
  }

  @LogBeforeAfter('_state')
  setFavoritesMutation(favorites: Favorite[]) {
    this._state.favorites = favorites
  }

  async fetchFavoritesAction() {
    const favorites = await this._favoritesRepository.fetchFavoritesAboutFriends()

    this.setFavoritesMutation(favorites)
  }
}
