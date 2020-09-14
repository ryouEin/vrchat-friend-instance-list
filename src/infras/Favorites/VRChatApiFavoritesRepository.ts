import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'
import { FavoriteApiResponse } from '@/types/ApiResponse'
import { IVRChatApi } from '@/libs/VRChatApi/IVRChatApi'
import { FavoriteTag } from '@/types'

export class VRChatApiFavoritesRepository implements IFavoritesRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  async fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]> {
    return await this._vrchatApi.listFavorites({
      type: 'friend',
      n: 100,
    })
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
}
