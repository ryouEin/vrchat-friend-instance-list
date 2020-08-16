import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { Friend, Instance, InstanceLocation } from '@/types'
import {
  applyOldInstanceStatesToNewInstances,
  getLocationsFromFriends,
  makeInstancesFromLocations,
} from './functions'
import { fetchInstanceInfo } from '@/infras/network/vrcApi'
import { InstanceInfo } from '@/types/ApiResponse'
import worldsStore from '@/store/module/WorldsStore'

@Module({ namespaced: true, name: 'instances' })
export default class InstancesStore extends VuexModule {
  private _instances: Instance[] = []

  get instances() {
    return this._instances
  }

  get instanceByLocation() {
    return (location: InstanceLocation) => {
      return this.instances.find(instance => instance.location === location)
    }
  }

  @Mutation
  private clearInstances() {
    this._instances = []
  }

  @Mutation
  private updateInstancesWithLocations(locations: InstanceLocation[]) {
    const newInstances = makeInstancesFromLocations(locations)
    this._instances = applyOldInstanceStatesToNewInstances(
      newInstances,
      this._instances
    )
  }

  @Mutation
  private setInstanceInfo(instanceInfo: InstanceInfo) {
    this._instances = this._instances.map(instance => {
      if (instanceInfo.location === instance.location) {
        const userNum = instanceInfo.n_users

        return {
          ...instance,
          userNum,
        }
      }

      return instance
    })
  }

  @Mutation
  private startWatching({
    location,
    notifyUserNum,
    onFindVacancy,
  }: {
    location: InstanceLocation
    notifyUserNum: number
    onFindVacancy: () => void
  }) {
    this._instances = this._instances.map(instance => {
      if (instance.location === location) {
        return {
          ...instance,
          isWatching: true,
          notifyUserNum,
          onFindVacancy,
        }
      }

      return instance
    })
  }

  @Mutation
  private endWatching(location: InstanceLocation) {
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

  // TODO: Friendsの更新がある度にこれを呼び出す必要があるのが違和感
  @Action({ commit: 'updateInstancesWithLocations', rawError: true })
  async update(friends: Friend[]) {
    return getLocationsFromFriends(friends)
  }

  @Action({ commit: 'setInstanceInfo', rawError: true })
  async updateInstanceInfo(location: InstanceLocation) {
    return await fetchInstanceInfo(location)
  }

  // TODO: テストのために依存をはがすため、hardCapacityを引数として渡しているが微妙。
  //  本来ならコンストラクタインジェクション等で対応するがvuex-module-decoratorsは
  //  コンストラクタを自分で呼ぶ方法を提供していないため出来なかった。
  //  もっといい方法を模索
  @Action({ rawError: true })
  async checkWatchingInstanceVacancy({
    location,
    hardCapacity,
  }: {
    location: InstanceLocation
    hardCapacity: number
  }) {
    const instance = this.instanceByLocation(location)

    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }
    if (!instance.isWatching) {
      throw new Error('instance is not watching.')
    }
    if (instance.userNum === undefined) {
      throw new Error('userNum is undefined.')
    }

    const hasRequiredVacancy =
      instance.userNum + instance.notifyUserNum <= hardCapacity
    if (hasRequiredVacancy) {
      const onFindVacancy = instance.onFindVacancy
      if (onFindVacancy !== undefined) {
        onFindVacancy()
      }

      this.context.commit('endWatching', instance.location)
    }
  }

  @Action({ commit: 'startWatching', rawError: true })
  async watchInstance({
    location,
    notifyUserNum,
    onFindVacancy,
  }: {
    location: InstanceLocation
    notifyUserNum: number
    onFindVacancy: () => void
  }) {
    return {
      location,
      notifyUserNum,
      onFindVacancy,
    }
  }

  @Action({ commit: 'endWatching', rawError: true })
  async unwatchInstance(location: InstanceLocation) {
    return location
  }

  @Action({ rawError: true })
  async checkWatchingInstances() {
    const watchingInstances = this.instances.filter(
      instance => instance.isWatching
    )
    const promises = watchingInstances.map(async instance => {
      await this.context.dispatch('updateInstanceInfo', instance.location)
      const world = worldsStore.world(instance.worldId)
      if (world === undefined) {
        throw new Error('world is undefined.')
      }
      await this.context.dispatch('checkWatchingInstanceVacancy', {
        location: instance.location,
        hardCapacity: world.hardCapacity,
      })
    })

    return Promise.all(promises)
  }

  @Action({ rawError: true })
  async clear() {
    this.context.commit('clearInstances')
  }
}
