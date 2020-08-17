import { Favorite, User } from '@/types/ApiResponse'

export interface IFriendsRepository {
  fetchAllFriends(): Promise<User[]>

  // TODO: Favoriteというカテゴリを作成してそこに移動したほうがいいか？
  fetchFavoritesAboutFriends(): Promise<Favorite[]>
}
