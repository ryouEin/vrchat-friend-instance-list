import { computed, reactive } from '@vue/composition-api'
import { UserApiResponse } from '@/types/ApiResponse'
import { Friend, InstanceLocation } from '@/types'
import { ICanGetFavoriteByUserId } from '@/domains/Favorites/FavoritesStore'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { markNewFriends } from '@/domains/Friends/FriendsService'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

// TODO: 命名に関して再考。流石にFriendWithNewはやばそう
export type FriendWithNew = UserApiResponse & { isNew: boolean }

type State = {
  friends: FriendWithNew[]
}
@MakeReferenceToWindowObjectInDevelopment('friendsStore')
export class FriendsStore {
  constructor(
    private readonly _friendsRepository: IFriendsRepository,
    private readonly _favoritesStore: ICanGetFavoriteByUserId
  ) {}

  private readonly _state = reactive<State>({
    friends: [],
  })

  readonly friends = computed<Friend[]>(() => {
    return this._state.friends.map(friend => {
      const favorite = this._favoritesStore.favoriteByUserId.value(friend.id)

      return {
        ...friend,
        favorite,
      }
    })
  })

  readonly friendsByLocation = computed<
    (location: InstanceLocation) => Friend[]
  >(() => {
    return (location: InstanceLocation) => {
      return this.friends.value.filter(friend => friend.location === location)
    }
  })

  @LogBeforeAfter('_state')
  private setFriendsMutation(friends: Friend[]) {
    this._state.friends = friends
  }

  async fetchFriendsAction() {
    const newFriends = await this._friendsRepository.fetchAllFriends()

    this.setFriendsMutation(markNewFriends(this._state.friends, newFriends))
  }
}
