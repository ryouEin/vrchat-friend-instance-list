import {
  FavoriteApiResponse,
  InstanceApiResponse,
  UserApiResponse,
  WorldApiResponse,
} from '@/types/ApiResponse'
import { InstanceLocation } from '@/types'

export type FavoriteType = 'world' | 'friend' | 'avatar'

export type SortOptions =
  | 'popularity'
  | 'created'
  | 'updated'
  | 'order'
  | '_created_at'
  | '_updated_at'

export type OrderOptions = 'ascending' | 'descending'

export type GetFriendsParams = {
  n: number
  offset: number
}

export type ListFavoritesParams = {
  type: FavoriteType
  n: number
}

export type GetWorldParams = {
  id: string
}

export type ListWorldsParams = {
  n: number
  sort: SortOptions
  order: OrderOptions
}

export type GetInstanceParams = {
  location: InstanceLocation
}

export type InviteMeParams = {
  location: InstanceLocation
}

export interface IVRChatApi {
  getFriends(params: GetFriendsParams): Promise<UserApiResponse[]>

  listFavorites(params: ListFavoritesParams): Promise<FavoriteApiResponse[]>

  getWorld(params: GetWorldParams): Promise<WorldApiResponse>

  listWorlds(params: ListWorldsParams): Promise<WorldApiResponse[]>

  getInstance(params: GetInstanceParams): Promise<InstanceApiResponse>

  inviteMe(params: InviteMeParams): Promise<void>
}
