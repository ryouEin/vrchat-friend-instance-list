import * as ApiResponse from '@/types/ApiResponse'
import { FavoriteApiResponse } from '@/types/ApiResponse'
import { Friend } from '@/types'
import intersectionBy from 'lodash/intersectionBy'
import differenceBy from 'lodash/differenceBy'

// TODO: ここでisNewを設定していることの是非を再考
// TODO: 関数名を再考
export const makePresentationFriends: (
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

// TODO: 引数名、変数名が混同しそう。命名を再考
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
