import Vue from 'vue'
import { Friend, InstanceLocation } from '@/types'
import {
  makePresentationFriends,
  markNewFriends,
} from '@/store/data/FriendsStore/functions'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { FriendsRepository } from '@/infras/Friends/FriendsRepository'
import { FriendsApi } from '@/infras/Friends/Api/FriendsApi'
import { Network } from '@/libs/Network/Network'

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

const friendsRepository = new FriendsRepository(new FriendsApi(new Network()))
const friendsStore = new FriendsStore(friendsRepository)

export default friendsStore
