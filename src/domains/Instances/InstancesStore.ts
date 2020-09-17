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

type State = {
  instances: Instance[]
}
export const createInstancesStore = (
  instancesRepository: IInstancesRepository,
  worldStore: ICanGetWorldById
) => {
  const state = reactive<State>({
    instances: [],
  })

  const instances = computed<Instance[]>(() => {
    return state.instances
  })

  const instanceByLocation = computed<
    (location: InstanceLocation) => Instance | undefined
  >(() => {
    return (location: InstanceLocation) => {
      return state.instances.find(instance => instance.location === location)
    }
  })

  const updateInstancesWithLocationsMutation = (
    locations: InstanceLocation[]
  ) => {
    const newInstances = makeInstancesFromLocations(locations)
    state.instances = applyOldInstanceStatesToNewInstances(
      newInstances,
      state.instances
    )
  }

  const setInstanceInfoMutation = (instanceInfo: InstanceApiResponse) => {
    state.instances = state.instances.map(instance => {
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

  const startWatchingMutation = ({
    location,
    notifyUserNum,
    onFindVacancy,
  }: {
    location: InstanceLocation
    notifyUserNum: number
    onFindVacancy: () => void
  }) => {
    state.instances = state.instances.map(instance => {
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

  const endWatchingMutation = (location: InstanceLocation) => {
    state.instances = state.instances.map(instance => {
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
  const updateAction = async (friends: Friend[]) => {
    const locations = getLocationsFromFriends(friends)
    updateInstancesWithLocationsMutation(locations)
  }

  const updateInstanceInfoAction = async (location: InstanceLocation) => {
    const instanceInfo = await instancesRepository.fetchInstance(location)
    setInstanceInfoMutation(instanceInfo)
  }

  const checkWatchingInstanceVacancyAction = async (
    location: InstanceLocation
  ) => {
    const instance = instanceByLocation.value(location)

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

    const world = worldStore.world(instance.worldId)
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

      endWatchingMutation(instance.location)
    }
  }

  const watchInstanceAction = async ({
    location,
    notifyUserNum,
    onFindVacancy,
  }: {
    location: InstanceLocation
    notifyUserNum: number
    onFindVacancy: () => void
  }) => {
    startWatchingMutation({
      location,
      notifyUserNum,
      onFindVacancy,
    })
  }

  const unwatchInstanceAction = async (location: InstanceLocation) => {
    endWatchingMutation(location)
  }

  const checkWatchingInstancesAction = async () => {
    const watchingInstances = instances.value.filter(
      instance => instance.isWatching
    )
    const promises = watchingInstances.map(async instance => {
      await updateInstanceInfoAction(instance.location)
      await checkWatchingInstanceVacancyAction(instance.location)
    })

    return Promise.all(promises)
  }

  return {
    instances,
    instanceByLocation,
    updateAction,
    updateInstanceInfoAction,
    checkWatchingInstanceVacancyAction,
    watchInstanceAction,
    unwatchInstanceAction,
    checkWatchingInstancesAction,
  }
}
