import { IFavoritesRepository } from '@/infras/Favorites/IFavoritesRepository'
import { FavoriteApiResponse } from '@/types/ApiResponse'
import { IVRChatApi } from '@/libs/VRChatApi/IVRChatApi'

export class VRChatApiFavoritesRepository implements IFavoritesRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  async fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]> {
    return await this._vrchatApi.listFavorites({
      type: 'friend',
      n: 100,
    })
  }
}
