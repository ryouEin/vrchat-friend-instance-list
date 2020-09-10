import { FavoriteApiResponse } from '@/types/ApiResponse'

export interface IFavoritesRepository {
  fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]>
}
