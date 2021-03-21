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
      offline: false,
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

      // なんでかしらんが、VRChatAPIの `/api/1/auth/user/friends` がoffsetいくらでかくしても
      // なんかしら（観測範囲一人）ユーザーを返すので、返却人数が0人だったら終了とみなす判定法が使えない
      // なので、後ろふたつが一定人数以下ならもう終わりだろうという判定法を採用する
      const MINIMUM_USER_LENGTH = 5
      if (
        tmp02.length <= MINIMUM_USER_LENGTH &&
        tmp03.length <= MINIMUM_USER_LENGTH
      ) {
        break
      }

      currentPage += 3
    }

    friends = uniqBy(friends, 'id')

    return friends
  }
}
