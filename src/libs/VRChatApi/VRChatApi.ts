import {
  AddFavoriteParams,
  DeleteFavoriteParams,
  GetFriendsParams,
  GetInstanceParams,
  GetWorldParams,
  InviteMeParams,
  IVRChatApi,
  ListFavoritesParams,
  ListWorldsParams,
} from './IVRChatApi'
import {
  FavoriteApiResponse,
  InstanceApiResponse,
  UserApiResponse,
  WorldApiResponse,
} from '../../types/ApiResponse'
import { INetwork } from '../Network/INetwork'
import { VrcApiUrl } from '../../config/url'
import { NetworkError } from '../Network/Network'

export class VRChatApiError extends NetworkError {}

export class VRChatApiUnauthorizedError extends VRChatApiError {
  constructor() {
    super(401, 'unauthorized from vrchat api')
  }
}

export class VRChatApiFavoriteLimitReachedError extends VRChatApiError {
  constructor() {
    super(400, 'favorite limit per group reached')
  }
}

export class VRChatApi implements IVRChatApi {
  constructor(
    private readonly _network: INetwork,
    private readonly _onError?: (error: unknown) => void
  ) {}

  commonErrorHandle(error: unknown) {
    let throwError = error

    if (error instanceof NetworkError) {
      if (error.details.status === 401) {
        throwError = new VRChatApiUnauthorizedError()
      } else {
        throwError = new VRChatApiError(error.details.status, error.message)
      }
    }

    if (this._onError !== undefined) {
      this._onError(throwError)
    } else {
      throw throwError
    }
  }

  async getFriends(params: GetFriendsParams): Promise<UserApiResponse[]> {
    const response = await this._network
      .get(VrcApiUrl.getFetchFriendsUrl(), {
        params,
      })
      .catch((error) => {
        this.commonErrorHandle(error)
      })

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as UserApiResponse[]
  }

  async addFavorite(params: AddFavoriteParams): Promise<FavoriteApiResponse> {
    const response = await this._network
      .post(VrcApiUrl.getAddFavoriteUrl(), {
        type: params.type,
        favoriteId: params.favoriteId,
        tags: params.tags,
      })
      .catch((error) => this.commonErrorHandle(error))
      .catch((error) => {
        if (error instanceof VRChatApiError && error.details.status === 400) {
          throw new VRChatApiFavoriteLimitReachedError()
        } else {
          throw error
        }
      })

    return response as FavoriteApiResponse
  }

  async listFavorites(
    params: ListFavoritesParams
  ): Promise<FavoriteApiResponse[]> {
    const response = await this._network
      .get(VrcApiUrl.getFetchFavoritesUrl(), {
        params,
      })
      .catch((error) => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as FavoriteApiResponse[]
  }

  async deleteFavorite(params: DeleteFavoriteParams): Promise<void> {
    await this._network
      .delete(VrcApiUrl.getDeleteFavoriteUrl(params.id))
      .catch((error) => this.commonErrorHandle(error))
  }

  async getWorld(params: GetWorldParams): Promise<WorldApiResponse> {
    const response = await this._network
      .get(VrcApiUrl.getFetchWorldUrl(params.id), {
        throttle: true,
      })
      .catch((error) => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as WorldApiResponse
  }

  async listWorlds(params: ListWorldsParams): Promise<WorldApiResponse[]> {
    const response = await this._network
      .get(VrcApiUrl.getFetchWorldsUrl(), {
        params,
      })
      .catch((error) => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as WorldApiResponse[]
  }

  async getInstance(params: GetInstanceParams): Promise<InstanceApiResponse> {
    const response = await this._network
      .get(VrcApiUrl.getFetchInstanceUrl(params.location))
      .catch((error) => this.commonErrorHandle(error))

    // TODO: Networkから取得したデータのバリデーションして型アサーション外す
    return response as InstanceApiResponse
  }

  async inviteMe(params: InviteMeParams): Promise<void> {
    await this._network
      .post(VrcApiUrl.getInviteMeUrl(params.location), {})
      .catch((error) => this.commonErrorHandle(error))
  }
}
