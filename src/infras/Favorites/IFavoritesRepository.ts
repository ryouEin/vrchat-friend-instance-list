import { FavoriteApiResponse } from '@/types/ApiResponse'
import { FavoriteTag } from '@/types'

export interface IFavoritesRepository {
  fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]>

  addFavoriteAboutFriend(
    userId: string,
    tag: FavoriteTag
  ): Promise<FavoriteApiResponse>

  deleteFavoritesAboutFriends(id: string): Promise<void>
}
