import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Instance } from '@/types'
import { friendsModule } from '@/presentations/store/ModuleFactory'
import {
  getInstancesFromFriends,
  mergeInstanceDetailsAndWatchingStates,
} from './functions'

export type WatchingState = {
  location: string
  isWatching: boolean
  notifyUserNum: number
}

@Module({ namespaced: true, name: 'instances' })
export default class InstancesStore extends VuexModule {
  private _watchingStates: WatchingState[] = []

  get instances(): Instance[] {
    const instanceDetails = getInstancesFromFriends(friendsModule.friends)

    return mergeInstanceDetailsAndWatchingStates(
      instanceDetails,
      this._watchingStates
    )
  }

  // TODO SOON: 監視処理実装
  @Mutation
  private addWatchingState(location: string, notifyUserNum: number) {
    this._watchingStates.push({
      location,
      isWatching: true,
      notifyUserNum,
    })
  }

  @Mutation
  private removeWatchingState(location: string) {
    this._watchingStates = this._watchingStates.filter(
      watchingState => watchingState.location !== location
    )
  }

  @Action({ commit: 'addWatchingState' })
  async watchInstance(location: string, notifyUserNum: number) {
    return {
      location,
      notifyUserNum,
    }
  }

  @Action({ commit: 'removeWatchingState' })
  async unwatchInstance(location: string) {
    return location
  }
}
