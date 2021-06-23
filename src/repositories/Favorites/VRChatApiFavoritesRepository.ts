import { IFavoritesRepository } from './IFavoritesRepository'
import { FavoriteApiResponse } from '../../types/ApiResponse'
import { IVRChatApi } from '../../libs/VRChatApi/IVRChatApi'
import { FavoriteTag } from '../../types'
import { FavoriteLimit } from '../../presentations/types'
import { MAX_FAVORITE_PER_GROUP } from '../../config/settings'
import { logger } from '../../factory/logger'

const IRREGULAR_FAVORITE_OFFSET = 1000

const fetchFavoritesAboutFriendsAll = async (vrchatApi: IVRChatApi) => {
  let currentOffset = 0
  let favorites: FavoriteApiResponse[] = []

  while (true) {
    const [response1, response2] = await Promise.all([
      vrchatApi.listFavorites({
        type: 'friend',
        n: 100,
        offset: currentOffset,
      }),
      vrchatApi.listFavorites({
        type: 'friend',
        n: 100,
        offset: currentOffset + 100,
      }),
    ])

    currentOffset += 200
    favorites = favorites.concat(response1).concat(response2)

    if (response2.length <= 0) break
    if (currentOffset > IRREGULAR_FAVORITE_OFFSET) {
      logger.error(
        `offset ${IRREGULAR_FAVORITE_OFFSET} を超えてfavoriteを取得しようとしました`
      )
      break
    }
  }

  return favorites
}

export class VRChatApiFavoritesRepository implements IFavoritesRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  async fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]> {
    return fetchFavoritesAboutFriendsAll(this._vrchatApi)
  }

  async addFavoriteAboutFriend(
    userId: string,
    tag: FavoriteTag
  ): Promise<FavoriteApiResponse> {
    return await this._vrchatApi.addFavorite({
      type: 'friend',
      tags: [tag],
      favoriteId: userId,
    })
  }

  async deleteFavoritesAboutFriends(id: string): Promise<void> {
    return await this._vrchatApi.deleteFavorite({
      id,
    })
  }

  async fetchFriendFavoriteLimits(): Promise<FavoriteLimit[]> {
    const limits: FavoriteLimit[] = [
      {
        name: 'group_0',
        used: 0,
        capacity: MAX_FAVORITE_PER_GROUP,
      },
      {
        name: 'group_1',
        used: 0,
        capacity: MAX_FAVORITE_PER_GROUP,
      },
      {
        name: 'group_2',
        used: 0,
        capacity: MAX_FAVORITE_PER_GROUP,
      },
    ]

    const favoriteApiResponses = await this.fetchFavoritesAboutFriends()

    favoriteApiResponses.forEach((favoriteApiResponse) => {
      const tag = favoriteApiResponse.tags[0]
      const limit = limits.find((limit) => limit.name === tag)
      if (limit !== undefined) {
        limit.used++
      } else {
        logger.error(new Error(`unknown favorite tag ${tag} was found.`))
      }
    })

    return limits
  }
}
