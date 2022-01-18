import { UserApiResponse } from '../../types/ApiResponse'

export interface IUsersRepository {
  fetchUser(id: string): Promise<UserApiResponse>
}
