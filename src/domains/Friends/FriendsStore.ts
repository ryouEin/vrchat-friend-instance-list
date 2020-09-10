import Vue from 'vue'
import { Friend, InstanceLocation } from '@/types'
import { markNewFriends } from '@/domains/Friends/FriendsService'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { UserApiResponse } from '@/types/ApiResponse'
import { ICanGetFavoriteByUserId } from '@/domains/Favorites/FavoritesStore'

// TODO SOON: 命名に関して再考
//  Presentationカテゴリを作ったほうがいいかも
//  各ストアgetで返す型は全部Presentationカテゴリに入れる（getで返すのは基本Presentationレイヤのためなので）
export type FriendWithNew = UserApiResponse & { isNew: boolean }

type State = {
  friends: FriendWithNew[]
}
@MakeReferenceToWindowObjectInDevelopment('friendsStore')
export class FriendsStore {
  private _state = Vue.observable<State>({
    friends: [],
  })

  constructor(
    private readonly _friendsRepository: IFriendsRepository,
    private readonly _favoritesStore: ICanGetFavoriteByUserId
  ) {}

  get friends(): Friend[] {
    return this._state.friends.map(friend => {
      const favorite = this._favoritesStore.favoriteByUserId(friend.id)

      return {
        ...friend,
        favorite,
      }
    })
  }

  get friendsByLocation() {
    return (location: InstanceLocation) => {
      return this.friends.filter(friend => friend.location === location)
    }
  }

  @LogBeforeAfter('_state')
  private setFriendsMutation(friends: FriendWithNew[]) {
    this._state.friends = friends
  }

  async fetchFriendsAction() {
    const friends = await this._friendsRepository.fetchAllFriends()

    this.setFriendsMutation(markNewFriends(this.friends, friends))
  }
}
