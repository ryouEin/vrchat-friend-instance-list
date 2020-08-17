import { Favorite, User } from '@/types/ApiResponse'

export interface IFriendsApi {
  fetchFriends(page: number): Promise<User[]>

  fetchFavoritesAboutFriend(): Promise<Favorite[]>
}
