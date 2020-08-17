import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { Favorite, User } from '@/types/ApiResponse'
import uniqBy from 'lodash/uniqBy'
import { IFriendsApi } from '@/infras/Friends/Api/IFriendsApi'

export class FriendsRepository implements IFriendsRepository {
  constructor(private readonly _friendsApi: IFriendsApi) {}

  async fetchAllFriends(): Promise<User[]> {
    let friends: User[] = []
    let currentPage = 0

    // eslint-disable-next-line
    while (true) {
      const [tmp01, tmp02, tmp03] = await Promise.all([
        this._friendsApi.fetchFriends(currentPage),
        this._friendsApi.fetchFriends(currentPage + 1),
        this._friendsApi.fetchFriends(currentPage + 2),
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

  async fetchFavoritesAboutFriends(): Promise<Favorite[]> {
    return this._friendsApi.fetchFavoritesAboutFriend()
  }
}
