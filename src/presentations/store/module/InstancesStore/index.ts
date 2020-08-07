import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Instance } from '@/types'
import {
  friendsModule,
  notificationsModule,
} from '@/presentations/store/ModuleFactory'
import { getLocationsFromFriends } from './functions'
import { fetchInstanceInfo } from '@/infras/network/vrcApi'
import { InstanceInfo } from '@/types/ApiResponse'

export type WatchingInstance = {
  location: string
  notifyUserNum: number
  userNum?: number
}

@Module({ namespaced: true, name: 'instances' })
export default class InstancesStore extends VuexModule {
  private _instances: Instance[] = []

  get instances() {
    return this._instances
  }

  get instanceByLocation() {
    return (location: string) => {
      return this.instances.find(instance => instance.location === location)
    }
  }

  // TODO SOON: 命名微妙（古いデータを利用する処理なのにinitは違うだろ感）
  // TODO SOON: 内部処理関数化・テスト
  @Mutation
  private initInstancesWithLocations(locations: string[]) {
    this._instances = locations.map(location => {
      const instance = this._instances.find(
        instance => instance.location === location
      )
      if (instance === undefined) {
        return {
          location,
          isWatching: false,
          notifyUserNum: 1,
        }
      }

      return instance
    })
  }

  @Mutation
  private updateInstanceInfo(instanceInfo: InstanceInfo) {
    this._instances = this._instances.map(instance => {
      if (instanceInfo.location === instance.location) {
        // TODO SOON: hardCapの算出場所とかを統一
        const hardCapacity =
          instanceInfo.capacity === 1 ? 1 : instanceInfo.capacity * 2
        const userNum = instanceInfo.n_users
        const newInstance = {
          ...instance,
          userNum,
          hardCapacity,
        }

        // TODO SOON: 論理的凝集になってしまってる
        if (
          instance.isWatching &&
          userNum + instance.notifyUserNum <= hardCapacity
        ) {
          // TODO SOON: 通知の実装
          const callback = instance.callback
          if (callback !== undefined) {
            // TODO SOON: Mutationの中でAction呼び出しはダメ？
            callback()
          }
          newInstance.isWatching = false
        }

        return newInstance
      }

      return instance
    })
  }

  // TODO SOON: callbackって名前どうにかしたい
  @Mutation
  private startWatching({
    location,
    notifyUserNum,
    callback,
  }: {
    location: string
    notifyUserNum: number
    callback: () => void
  }) {
    this._instances = this._instances.map(instance => {
      if (instance.location === location) {
        return {
          ...instance,
          isWatching: true,
          notifyUserNum,
          callback,
        }
      }
      return instance
    })
  }

  @Mutation
  private endWatching(location: string) {
    this._instances = this._instances.map(instance => {
      if (instance.location === location) {
        return {
          ...instance,
          isWatching: false,
        }
      }

      return instance
    })
  }

  // TODO SOON: Friendsの更新がある度にこれを呼び出す必要があるのが違和感
  @Action({ commit: 'initInstancesWithLocations' })
  async updateInstances() {
    return getLocationsFromFriends(friendsModule.friends)
  }

  @Action({ commit: 'updateInstanceInfo' })
  async updateUserNum(location: string) {
    return await fetchInstanceInfo(location)
  }

  @Action({ commit: 'startWatching' })
  async watchInstance({
    location,
    notifyUserNum,
    callback,
  }: {
    location: string
    notifyUserNum: number
    callback: () => void
  }) {
    return {
      location,
      notifyUserNum,
      callback,
    }
  }

  @Action({ commit: 'endWatching' })
  async unwatchInstance(location: string) {
    return location
  }

  @Action
  async checkWatchingInstances() {
    const watchingInstances = this.instances.filter(
      instance => instance.isWatching
    )
    const promises = watchingInstances.map(instance =>
      this.context.dispatch('updateUserNum', instance.location)
    )

    return Promise.all(promises)
  }
}
