import * as ApiResponse from '@/types/ApiResponse'
import { FavoriteApiResponse } from '@/types/ApiResponse'
import { Friend } from '@/types'
import intersectionBy from 'lodash/intersectionBy'
import differenceBy from 'lodash/differenceBy'

export const convertApiResponseForPresentation: (
  friends: ApiResponse.UserApiResponse[],
  favorites: FavoriteApiResponse[]
) => Friend[] = (friends, favorites) => {
  return friends.map(friend => {
    const isFavorited =
      favorites.find(favorite => favorite.favoriteId === friend.id) !==
      undefined
    return {
      ...friend,
      isFavorited,
      isNew: false,
    }
  })
}

export const markNewFriends: (
  oldFriends: Friend[],
  newFriends: Friend[]
) => Friend[] = (oldFriends, newFriends) => {
  // oldFriendsが0名の時にNewタグをつけると、全員についてしまうのでそういうときはつけない
  if (oldFriends.length <= 0) return newFriends

  const friendMarkedNotNew = intersectionBy(newFriends, oldFriends, 'id').map(
    friend => {
      return {
        ...friend,
        isNew: false,
      }
    }
  )
  const friendMarkedNew = differenceBy(newFriends, oldFriends, 'id').map(
    friend => {
      return {
        ...friend,
        isNew: true,
      }
    }
  )

  return friendMarkedNotNew.concat(friendMarkedNew)
}
