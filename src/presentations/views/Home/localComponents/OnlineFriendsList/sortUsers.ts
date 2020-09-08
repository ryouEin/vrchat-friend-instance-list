import { Friend } from '@/types'

export const sortUsers: (users: Friend[]) => Friend[] = users => {
  return users.sort((a, b) => {
    if (a.isFavorited !== b.isFavorited) {
      return a.isFavorited ? -1 : 1
    }

    if (a.isNew !== b.isNew) {
      return a.isNew ? -1 : 1
    }

    return a.displayName.localeCompare(b.displayName, 'ja')
  })
}
