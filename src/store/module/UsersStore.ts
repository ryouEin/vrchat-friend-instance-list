import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import * as vrcApiService from '@/infras/network/vrcApi'
import * as ApiResponse from '@/types/ApiResponse'
import { Favorite } from '@/types/ApiResponse'
import uniqBy from 'lodash/uniqBy'
import intersectionBy from 'lodash/intersectionBy'
import differenceBy from 'lodash/differenceBy'
import { User } from '@/types'

// TODO: 外部で使わない関数をテストのためにexportしていることの是非を再考
// TODO: この関数は汎用的だから別のファイルに配置したほうがいいのでは？再考
// TODO: コードがゴリ押しなので整理
export const fetchAllUsers = async (
  fetchFriends: vrcApiService.FetchFriendsFunction
) => {
  let users: ApiResponse.User[] = []
  let currentPage = 0

  // eslint-disable-next-line
  while (true) {
    const [tmp01, tmp02, tmp03] = await Promise.all([
      fetchFriends(currentPage),
      fetchFriends(currentPage + 1),
      fetchFriends(currentPage + 2),
    ])

    users = users.concat(tmp01)
    users = users.concat(tmp02)
    users = users.concat(tmp03)
    if (tmp01.length <= 0 || tmp02.length <= 0 || tmp03.length <= 0) {
      break
    }

    currentPage += 3
  }

  users = uniqBy(users, 'id')

  return users
}

// TODO: 外部で使わない関数をテストのためにexportしていることの是非を再考
// TODO: ここでisNewを設定していることの是非を再考
// TODO: 関数名を再考
export const makePresentationUsers: (
  users: ApiResponse.User[],
  favorites: Favorite[]
) => User[] = (users, favorites) => {
  return users.map(user => {
    const isFavorited =
      favorites.find(favorite => favorite.favoriteId === user.id) !== undefined
    return {
      ...user,
      isFavorited,
      isNew: false,
    }
  })
}

// TODO: 外部で使わない関数をテストのためにexportしていることの是非を再考
// TODO: 引数名、変数名が混同しそう。命名を再考
export const markNewUser: (oldUsers: User[], newUsers: User[]) => User[] = (
  oldUsers,
  newUsers
) => {
  const userMarkedNotNew = intersectionBy(newUsers, oldUsers, 'id').map(
    user => {
      return {
        ...user,
        isNew: false,
      }
    }
  )
  const userMarkedNew = differenceBy(newUsers, oldUsers, 'id').map(user => {
    return {
      ...user,
      isNew: true,
    }
  })

  return userMarkedNotNew.concat(userMarkedNew)
}

@Module({ namespaced: true, name: 'users' })
export default class UsersStore extends VuexModule {
  private _users: User[] = []

  get users() {
    return this._users
  }

  @Mutation
  private setUsers(users: User[]) {
    if (this._users.length <= 0) {
      this._users = users
      return
    }

    this._users = markNewUser(this._users, users)
  }

  @Action({ commit: 'setUsers' })
  async fetchUsers() {
    const [users, favorites] = await Promise.all([
      fetchAllUsers(vrcApiService.fetchFriends),
      vrcApiService.fetchFavoriteFriends(),
    ])

    return makePresentationUsers(users, favorites)
  }
}
