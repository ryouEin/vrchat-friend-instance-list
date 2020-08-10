import * as vrcApiService from '@/infras/network/vrcApi'
import * as ApiResponse from '@/types/ApiResponse'
import { Favorite } from '@/types/ApiResponse'
import uniqBy from 'lodash/uniqBy'
import { Friend } from '@/types'
import intersectionBy from 'lodash/intersectionBy'
import differenceBy from 'lodash/differenceBy'

// TODO: この関数は汎用的だから別のファイルに配置したほうがいいのでは？再考
// TODO: コードがゴリ押しなので整理
export const fetchAllFriends = async (
  fetchFriends: vrcApiService.FetchFriendsFunction
) => {
  let friends: ApiResponse.User[] = []
  let currentPage = 0

  // eslint-disable-next-line
  while (true) {
    const [tmp01, tmp02, tmp03] = await Promise.all([
      fetchFriends(currentPage),
      fetchFriends(currentPage + 1),
      fetchFriends(currentPage + 2),
    ])

    friends = friends.concat(tmp01)
    friends = friends.concat(tmp02)
    friends = friends.concat(tmp03)
    if (tmp01.length <= 0 || tmp02.length <= 0 || tmp03.length <= 0) {
      break
    }

    currentPage += 3
  }

  friends = uniqBy(friends, 'id')

  return friends
}

// TODO: ここでisNewを設定していることの是非を再考
// TODO: 関数名を再考
export const makePresentationFriends: (
  friends: ApiResponse.User[],
  favorites: Favorite[]
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
  oldUsers: Friend[],
  newUsers: Friend[]
) => Friend[] = (oldFriends, newFriends) => {
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
