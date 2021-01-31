import { Friend } from '../presentations/types'

export const sortUsers: (users: Friend[]) => Friend[] = (users) => {
  return [...users].sort((a, b) => {
    const aIsFavorited = a.favorite !== undefined
    const bIsFavorited = b.favorite !== undefined

    if (aIsFavorited !== bIsFavorited) {
      return aIsFavorited ? -1 : 1
    }

    if (a.isNew !== b.isNew) {
      return a.isNew ? -1 : 1
    }

    return a.displayName.localeCompare(b.displayName, 'ja')
  })
}
