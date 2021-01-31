import { FavoriteApiResponse } from '../../types/ApiResponse'
import { FavoriteTag } from '../../types'
import { FavoriteLimit } from '../../presentations/types'

export interface IFavoritesRepository {
  fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]>

  addFavoriteAboutFriend(
    userId: string,
    tag: FavoriteTag
  ): Promise<FavoriteApiResponse>

  deleteFavoritesAboutFriends(id: string): Promise<void>

  fetchFriendFavoriteLimits(): Promise<FavoriteLimit[]>
}
