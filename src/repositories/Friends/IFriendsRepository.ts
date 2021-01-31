import { UserApiResponse } from '../../types/ApiResponse'

export interface IFriendsRepository {
  fetchAllFriends(): Promise<UserApiResponse[]>
}
