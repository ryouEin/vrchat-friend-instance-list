import { Friend, Instance, InstanceLocation } from '@/types'
import uniqBy from 'lodash/uniqBy'
import { parseLocation } from '@/shame/parseLocation'

export const getLocationsFromFriends: (
  friends: Friend[]
) => string[] = friends => {
  const locations = uniqBy(friends, 'location').map(friend => friend.location)

  const instancesWithoutPrivate = locations
    .filter(location => location !== 'private')
    .sort()
  const privateInstance = locations.filter(location => location === 'private')

  return instancesWithoutPrivate.concat(privateInstance)
}

export const makeInstancesFromLocations: (
  locations: InstanceLocation[]
) => Instance[] = locations => {
  return locations.map(location => {
    const { worldId } = parseLocation(location)

    return {
      worldId,
      location,
      isWatching: false,
      notifyUserNum: 1,
    }
  })
}

export const applyOldInstanceStatesToNewInstances: (
  newInstances: Instance[],
  oldInstances: Instance[]
) => Instance[] = (newInstances, oldInstances) => {
  return newInstances.map(newInstance => {
    const oldInstance = oldInstances.find(
      oldInstance => oldInstance.location === newInstance.location
    )
    if (oldInstance === undefined) {
      return newInstance
    }

    return oldInstance
  })
}
