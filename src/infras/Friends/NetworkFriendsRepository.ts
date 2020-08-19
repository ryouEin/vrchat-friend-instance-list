import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { FavoriteApiResponse, UserApiResponse } from '@/types/ApiResponse'
import uniqBy from 'lodash/uniqBy'
import { VRC_API_URL } from '@/config/env'
import { INetwork } from '@/libs/Network/INetwork'

export class NetworkFriendsRepository implements IFriendsRepository {
  constructor(private readonly _network: INetwork) {}

  private async fetchFriends(page: number): Promise<UserApiResponse[]> {
    const COUNT_PER_PAGE = 100

    // TODO SOON: Networkから取得したデータのバリデーションして型アサーション外す
    return (await this._network.get(VRC_API_URL + '/api/1/auth/user/friends', {
      params: {
        n: COUNT_PER_PAGE,
        offset: COUNT_PER_PAGE * page,
      },
    })) as UserApiResponse[]
  }

  async fetchAllFriends(): Promise<UserApiResponse[]> {
    let friends: UserApiResponse[] = []
    let currentPage = 0

    // eslint-disable-next-line
    while (true) {
      const [tmp01, tmp02, tmp03] = await Promise.all([
        this.fetchFriends(currentPage),
        this.fetchFriends(currentPage + 1),
        this.fetchFriends(currentPage + 2),
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

  // TODO SOON: Networkから取得したデータのバリデーションして型アサーション外す
  async fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]> {
    return (await this._network.get(VRC_API_URL + '/api/1/favorites', {
      params: {
        type: 'friend',
        n: 100,
      },
    })) as FavoriteApiResponse[]
  }
}
