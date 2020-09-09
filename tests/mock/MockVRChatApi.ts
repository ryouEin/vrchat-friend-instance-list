/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
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

export class MockVRChatApi implements IVRChatApi {
  public friends: UserApiResponse[] = []

  public favorites: FavoriteApiResponse[] = []

  public worlds: WorldApiResponse[] = []

  public instances: InstanceApiResponse[] = []

  async getFriends(params: GetFriendsParams): Promise<UserApiResponse[]> {
    return this.friends.slice(params.offset, params.offset + params.n)
  }

  async listFavorites(
    params: ListFavoritesParams
  ): Promise<FavoriteApiResponse[]> {
    return this.favorites
  }

  async getWorld(params: GetWorldParams): Promise<WorldApiResponse> {
    const world = this.worlds.find(world => world.id === params.id)
    if (world === undefined) {
      throw new Error('world is undefined')
    }

    return world
  }

  async listWorlds(params: ListWorldsParams): Promise<WorldApiResponse[]> {
    return this.worlds
  }

  async getInstance(params: GetInstanceParams): Promise<InstanceApiResponse> {
    const instance = this.instances.find(
      instance => instance.location === params.location
    )
    if (instance === undefined) {
      throw new Error('instance is undefined')
    }

    return instance
  }

  async inviteMe(params: InviteMeParams): Promise<void> {}
}
