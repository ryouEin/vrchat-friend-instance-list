import { Friend, Instance, InstanceLocation } from '@/types'
import {
  applyOldInstanceStatesToNewInstances,
  getLocationsFromFriends,
  makeInstancesFromLocations,
} from './functions'
import { fetchInstanceInfo } from '@/infras/network/vrcApi'
import { InstanceInfo } from '@/types/ApiResponse'
import worldsStore from '@/store/data/WorldsStore'
import Vue from 'vue'
import { LogBeforeAfter } from '@/libs/Decorators'

type State = {
  instances: Instance[]
}
export class InstancesStore {
  private _state = Vue.observable<State>({
    instances: [],
  })

  get instances() {
    return this._state.instances
  }

  get instanceByLocation() {
    return (location: InstanceLocation) => {
      return this.instances.find(instance => instance.location === location)
    }
  }

  @LogBeforeAfter('_state')
  private updateInstancesWithLocationsMutation(locations: InstanceLocation[]) {
    const newInstances = makeInstancesFromLocations(locations)
    this._state.instances = applyOldInstanceStatesToNewInstances(
      newInstances,
      this.instances
    )
  }

  @LogBeforeAfter('_state')
  private setInstanceInfoMutation(instanceInfo: InstanceInfo) {
    this._state.instances = this.instances.map(instance => {
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

  @LogBeforeAfter('_state')
  private startWatchingMutation({
    location,
    notifyUserNum,
    onFindVacancy,
  }: {
    location: InstanceLocation
    notifyUserNum: number
    onFindVacancy: () => void
  }) {
    this._state.instances = this.instances.map(instance => {
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

  @LogBeforeAfter('_state')
  private endWatchingMutation(location: InstanceLocation) {
    this._state.instances = this.instances.map(instance => {
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
  async updateAction(friends: Friend[]) {
    const locations = getLocationsFromFriends(friends)
    this.updateInstancesWithLocationsMutation(locations)
  }

  async updateInstanceInfoAction(location: InstanceLocation) {
    const instanceInfo = await fetchInstanceInfo(location)
    this.setInstanceInfoMutation(instanceInfo)
  }

  // TODO SOON: テストのために依存をはがすため、hardCapacityを引数として渡しているが微妙。
  //  本来ならコンストラクタインジェクション等で対応するがvuex-data-decoratorsは
  //  コンストラクタを自分で呼ぶ方法を提供していないため出来なかった。
  //  もっといい方法を模索
  async checkWatchingInstanceVacancyAction({
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

      this.endWatchingMutation(instance.location)
    }
  }

  async watchInstanceAction({
    location,
    notifyUserNum,
    onFindVacancy,
  }: {
    location: InstanceLocation
    notifyUserNum: number
    onFindVacancy: () => void
  }) {
    this.startWatchingMutation({
      location,
      notifyUserNum,
      onFindVacancy,
    })
  }

  async unwatchInstanceAction(location: InstanceLocation) {
    this.endWatchingMutation(location)
  }

  async checkWatchingInstancesAction() {
    const watchingInstances = this.instances.filter(
      instance => instance.isWatching
    )
    const promises = watchingInstances.map(async instance => {
      await this.updateInstanceInfoAction(instance.location)
      const world = worldsStore.world(instance.worldId)
      if (world === undefined) {
        throw new Error('world is undefined.')
      }
      await this.checkWatchingInstanceVacancyAction({
        location: instance.location,
        hardCapacity: world.hardCapacity,
      })
    })

    return Promise.all(promises)
  }
}

const instancesStore = new InstancesStore()

// TODO SOON: development環境で、デバッグのためグローバルに参照を通す処理を共通化
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  // @ts-ignore
  window.instancesStore = instancesStore
}

export default instancesStore