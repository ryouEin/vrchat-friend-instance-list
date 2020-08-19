import Vue from 'vue'
import { Friend, InstanceLocation } from '@/types'
import {
  makePresentationFriends,
  markNewFriends,
} from '@/domains/Friends/FriendsService'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'

type State = {
  friends: Friend[]
}
@MakeReferenceToWindowObjectInDevelopment('friendsStore')
export class FriendsStore {
  private _state = Vue.observable<State>({
    friends: [],
  })

  constructor(private readonly _friendsRepository: IFriendsRepository) {}

  get friends() {
    return this._state.friends
  }

  get friendsByLocation() {
    return (location: InstanceLocation) => {
      return this.friends.filter(friend => friend.location === location)
    }
  }

  @LogBeforeAfter('_state')
  private setFriendsMutation(friends: Friend[]) {
    if (this.friends.length <= 0) {
      this._state.friends = friends
      return
    }

    this._state.friends = markNewFriends(this.friends, friends)
  }

  async fetchFriendsAction() {
    const [friends, favorites] = await Promise.all([
      this._friendsRepository.fetchAllFriends(),
      this._friendsRepository.fetchFavoritesAboutFriends(),
    ])

    this.setFriendsMutation(makePresentationFriends(friends, favorites))
  }
}
