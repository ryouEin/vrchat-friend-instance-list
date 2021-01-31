import { IFriendsRepository } from './IFriendsRepository'
import { UserApiResponse } from '../../types/ApiResponse'
import uniqBy from 'lodash/uniqBy'
import { IVRChatApi } from '../../libs/VRChatApi/IVRChatApi'

export class VRChatApiFriendsRepository implements IFriendsRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  private async fetchFriends(page: number): Promise<UserApiResponse[]> {
    const COUNT_PER_PAGE = 100

    return await this._vrchatApi.getFriends({
      n: COUNT_PER_PAGE,
      offset: COUNT_PER_PAGE * page,
    })
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
}
