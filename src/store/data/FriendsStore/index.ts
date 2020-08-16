import Vue from 'vue'
import * as vrcApiService from '@/infras/network/vrcApi'
import { Friend, InstanceLocation } from '@/types'
import {
  fetchAllFriends,
  makePresentationFriends,
  markNewFriends,
} from '@/store/data/FriendsStore/functions'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  friends: Friend[]
}
@MakeReferenceToWindowObjectInDevelopment('friendsStore')
export class FriendsStore {
  private _state = Vue.observable<State>({
    friends: [],
  })

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
      fetchAllFriends(vrcApiService.fetchFriends),
      vrcApiService.fetchFavoriteFriends(),
    ])

    this.setFriendsMutation(makePresentationFriends(friends, favorites))
  }
}

const friendsStore = new FriendsStore()

export default friendsStore
