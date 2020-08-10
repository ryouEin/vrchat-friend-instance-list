import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import * as vrcApiService from '@/infras/network/vrcApi'
import { Friend, InstanceLocation } from '@/types'
import {
  fetchAllFriends,
  makePresentationFriends,
  markNewFriends,
} from '@/store/module/FriendsStore/functions'

@Module({ namespaced: true, name: 'friends' })
export default class FriendsStore extends VuexModule {
  private _friends: Friend[] = []

  get friends() {
    return this._friends
  }

  get friendsByLocation() {
    return (location: InstanceLocation) => {
      return this.friends.filter(friend => friend.location === location)
    }
  }

  @Mutation
  private setFriends(friends: Friend[]) {
    if (this._friends.length <= 0) {
      this._friends = friends
      return
    }

    this._friends = markNewFriends(this._friends, friends)
  }

  @Mutation
  private clearFriends() {
    this._friends = []
  }

  @Action({ commit: 'setFriends', rawError: true })
  async fetchFriends() {
    const [friends, favorites] = await Promise.all([
      fetchAllFriends(vrcApiService.fetchFriends),
      vrcApiService.fetchFavoriteFriends(),
    ])

    return makePresentationFriends(friends, favorites)
  }

  @Action({ rawError: true })
  async clear() {
    this.context.commit('clearFriends')
  }
}
