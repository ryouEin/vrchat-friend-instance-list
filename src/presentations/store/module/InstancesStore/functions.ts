import { Friend } from '@/types'
import uniqBy from 'lodash/uniqBy'

// TODO SOON: テスト
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
