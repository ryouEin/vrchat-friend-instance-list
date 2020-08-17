import { IFriendsApi } from '@/infras/Friends/Api/IFriendsApi'
import { Favorite, User } from '@/types/ApiResponse'
import { INetwork } from '@/libs/Network/INetwork'
import { VRC_API_URL } from '@/config/env'

export class FriendsApi implements IFriendsApi {
  constructor(private readonly _network: INetwork) {}

  async fetchFriends(page: number): Promise<User[]> {
    const COUNT_PER_PAGE = 100

    return await this._network.get<User[]>(
      VRC_API_URL + '/api/1/auth/user/friends',
      {
        n: COUNT_PER_PAGE,
        offset: COUNT_PER_PAGE * page,
      }
    )
  }

  async fetchFavoritesAboutFriend(): Promise<Favorite[]> {
    return await this._network.get(VRC_API_URL + '/api/1/favorites', {
      type: 'friend',
      n: 100,
    })
  }
}
