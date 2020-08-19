import { FavoriteApiResponse, UserApiResponse } from '@/types/ApiResponse'

export interface IFriendsRepository {
  fetchAllFriends(): Promise<UserApiResponse[]>

  // TODO: Favoriteというカテゴリを作成してそこに移動したほうがいいか？
  fetchFavoritesAboutFriends(): Promise<FavoriteApiResponse[]>
}
