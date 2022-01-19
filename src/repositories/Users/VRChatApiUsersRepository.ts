import { IVRChatApi } from '../../libs/VRChatApi/IVRChatApi'
import { UserApiResponse } from '../../types/ApiResponse'
import { IUsersRepository } from './IUsersRepository'

export class VRChatApiUsersRepository implements IUsersRepository {
  constructor(private readonly _vrchatApi: IVRChatApi) {}

  async fetchUser(id: string): Promise<UserApiResponse> {
    return await this._vrchatApi.getUser({ id })
  }
}
