import {
  GetFriendsParams,
  GetInstanceParams,
  GetWorldParams,
  InviteMeParams,
  IVRChatApi,
  ListFavoritesParams,
  ListWorldsParams,
} from '@/libs/VRChatApi/IVRChatApi'
import {
  FavoriteApiResponse,
  InstanceApiResponse,
  UserApiResponse,
  WorldApiResponse,
} from '@/types/ApiResponse'
import { INetwork } from '@/libs/Network/INetwork'
import { VrcApiUrl } from '@/config/url'
import { NetworkError } from '@/libs/Network/Network'

export class VRChatApiError extends NetworkError {}

export class VRChatApiUnauthorizedError extends VRChatApiError {
  constructor() {
    super(401, 'unauthorized from vrchat api')
  }
}

export class VRChatApi implements IVRChatApi {
  constructor(private readonly _network: INetwork) {}

  commonErrorHandle(error: any) {
    if (error instanceof NetworkError) {
      if (error.details.status === 401) {
        throw new VRChatApiUnauthorizedError()
      } else {
        throw new VRChatApiError(error.details.status, error.message)
      }
    }

    throw error
  }

  async getFriends(params: GetFriendsParams): Promise<UserApiResponse[]> {
    const response = await this._network
      .get(VrcApiUrl.getFetchFriendsUrl(), {
        params,
      })
      .catch(error => {
        this.commonErrorHandle(error)
      })

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as UserApiResponse[]
  }

  async listFavorites(
    params: ListFavoritesParams
  ): Promise<FavoriteApiResponse[]> {
    const response = await this._network
      .get(VrcApiUrl.getFetchFavoritesUrl(), {
        params,
      })
      .catch(error => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as FavoriteApiResponse[]
  }

  async getWorld(params: GetWorldParams): Promise<WorldApiResponse> {
    const response = await this._network
      .get(VrcApiUrl.getFetchWorldUrl(params.id), {
        throttle: true,
      })
      .catch(error => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as WorldApiResponse
  }

  async listWorlds(params: ListWorldsParams): Promise<WorldApiResponse[]> {
    const response = await this._network
      .get(VrcApiUrl.getFetchWorldsUrl(), {
        params,
      })
      .catch(error => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as WorldApiResponse[]
  }

  async getInstance(params: GetInstanceParams): Promise<InstanceApiResponse> {
    const response = await this._network
      .get(VrcApiUrl.getFetchInstanceUrl(params.location))
      .catch(error => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as InstanceApiResponse
  }

  async inviteMe(params: InviteMeParams): Promise<void> {
    await this._network
      .post(VrcApiUrl.getInviteMeUrl(params.location), {})
      .catch(error => this.commonErrorHandle(error))
  }
}
