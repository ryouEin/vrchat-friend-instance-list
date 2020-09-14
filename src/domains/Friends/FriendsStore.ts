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

// TODO: 命名に関して再考。流石にFriendWithNewはやばそう
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

  // WARN: this.friendsは呼び出すたびに演算処理がなされるため、ループでこのgetterを
  //  呼ぶとめちゃくちゃ重くなる点注意
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
