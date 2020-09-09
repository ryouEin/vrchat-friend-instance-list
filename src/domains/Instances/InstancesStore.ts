import { Friend, Instance, InstanceLocation } from '@/types'
import {
  applyOldInstanceStatesToNewInstances,
  getLocationsFromFriends,
  makeInstancesFromLocations,
} from './InstancesService'
import { InstanceApiResponse } from '@/types/ApiResponse'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { IInstancesRepository } from '@/infras/Instances/IInstancesRepository'
import { ICanGetWorldById } from '@/domains/Worlds/WorldsStore'

type State = {
  instances: Instance[]
}
@MakeReferenceToWindowObjectInDevelopment('instancesStore')
export class InstancesStore {
  private _state = Vue.observable<State>({
    instances: [],
  })

  constructor(
    private readonly _instancesRepository: IInstancesRepository,
    private readonly _worldStore: ICanGetWorldById
  ) {}

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
  private setInstanceInfoMutation(instanceInfo: InstanceApiResponse) {
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
    const instanceInfo = await this._instancesRepository.fetchInstance(location)
    this.setInstanceInfoMutation(instanceInfo)
  }

  async checkWatchingInstanceVacancyAction(location: InstanceLocation) {
    const instance = this.instanceByLocation(location)

    // TODO: こんな適当な例外の投げ方で良いのか再考
    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }
    if (!instance.isWatching) {
      throw new Error('instance is not watching.')
    }
    if (instance.userNum === undefined) {
      throw new Error('userNum is undefined.')
    }

    const world = this._worldStore.world(instance.worldId)
    if (world === undefined) {
      throw new Error('world is undefined.')
    }
    const hardCapacity = world.hardCapacity

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
      await this.checkWatchingInstanceVacancyAction(instance.location)
    })

    return Promise.all(promises)
  }
}
