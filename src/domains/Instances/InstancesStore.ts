import { IInstancesRepository } from '@/infras/Instances/IInstancesRepository'
import { ICanGetWorldById } from '@/domains/Worlds/WorldsStore'
import { computed, reactive } from '@vue/composition-api'
import { Friend, Instance, InstanceLocation } from '@/types'
import {
  applyOldInstanceStatesToNewInstances,
  getLocationsFromFriends,
  makeInstancesFromLocations,
} from '@/domains/Instances/InstancesService'
import { InstanceApiResponse } from '@/types/ApiResponse'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'

type State = {
  instances: Instance[]
}
@MakeReferenceToWindowObjectInDevelopment('instancesStore')
export class InstancesStore {
  constructor(
    private readonly _instancesRepository: IInstancesRepository,
    private readonly _worldStore: ICanGetWorldById
  ) {}

  private readonly _state = reactive<State>({
    instances: [],
  })

  readonly instances = computed<Instance[]>(() => {
    return this._state.instances
  })

  readonly instanceByLocation = computed<
    (location: InstanceLocation) => Instance | undefined
  >(() => {
    return (location: InstanceLocation) => {
      return this._state.instances.find(
        instance => instance.location === location
      )
    }
  })

  @LogBeforeAfter('_state')
  private updateInstancesWithLocationsMutation(locations: InstanceLocation[]) {
    const newInstances = makeInstancesFromLocations(locations)
    this._state.instances = applyOldInstanceStatesToNewInstances(
      newInstances,
      this._state.instances
    )
  }

  @LogBeforeAfter('_state')
  private setInstanceInfoMutation(instanceInfo: InstanceApiResponse) {
    this._state.instances = this._state.instances.map(instance => {
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
    this._state.instances = this._state.instances.map(instance => {
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
    this._state.instances = this._state.instances.map(instance => {
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
    const instance = this.instanceByLocation.value(location)

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

    const world = this._worldStore.world.value(instance.worldId)
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
    const watchingInstances = this.instances.value.filter(
      instance => instance.isWatching
    )
    const promises = watchingInstances.map(async instance => {
      await this.updateInstanceInfoAction(instance.location)
      await this.checkWatchingInstanceVacancyAction(instance.location)
    })

    return Promise.all(promises)
  }
}
