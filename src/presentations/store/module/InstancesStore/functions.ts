import { Friend, Instance, InstanceDetail } from '@/types'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import { WatchingState } from '@/presentations/store/module/InstancesStore/index'

// TODO SOON: テスト
export const getInstancesFromFriends: (
  friends: Friend[]
) => InstanceDetail[] = friends => {
  const tmp: { [key: string]: Friend[] } = groupBy(friends, 'location')
  const instances = Object.entries(tmp).map(item => {
    const [location, friends] = item

    return {
      location,
      friends,
    }
  })

  const instancesWithoutPrivate = sortBy(
    instances.filter(instance => instance.location !== 'private'),
    'location'
  )
  const privateInstance = instances.filter(
    instance => instance.location === 'private'
  )

  return instancesWithoutPrivate.concat(privateInstance)
}

// TODO SOON: テスト
export const mergeInstanceDetailsAndWatchingStates: (
  instanceDetails: InstanceDetail[],
  watchingStates: WatchingState[]
) => Instance[] = (instanceDetails, watchingStates) => {
  return instanceDetails.map(instanceDetail => {
    const watchingState = watchingStates.find(
      item => item.location === instanceDetail.location
    ) || {
      location: instanceDetail.location,
      isWatching: false,
      notifyUserNum: 0,
    }

    return {
      ...instanceDetail,
      ...watchingState,
    }
  })
}
