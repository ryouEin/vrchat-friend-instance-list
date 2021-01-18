import { FavoriteTag, Instance, InstanceLocation, World } from '@/types'
import { Friend, FriendLocation } from '@/presentations/types'

export const SHOW_JOIN_DIALOG = 'showJoinDialog'
export type ShowJoinDialog = (instance: Instance) => void

export const UPDATE_INSTANCE = 'updateInstance'
export type UpdateInstance = (instance: Instance) => Promise<void>

export const SHOW_WATCH_DIALOG = 'showWatchDialog'
export type ShowWatchDialog = (instance: Instance) => void

export const START_WATCH_INSTANCE = 'startWatchInstance'
export type StartWatchInstance = (
  location: InstanceLocation,
  worldName: string,
  notifyUserNum: number
) => Promise<void>

export const END_WATCH_INSTANCE = 'endWatchInstance'
export type EndWatchInstance = (instance: Instance) => Promise<void>

export const FETCH_WORLD = 'fetchWorld'
export type FetchWorld = (worldId: string) => Promise<World>

export const SHOW_FAVORITE_DIALOG = 'showFavoriteDialog'
export type OnClickFavoriteCallback = (friend: Friend, tag: FavoriteTag) => void
export type ShowFavoriteDialog = (
  friend: Friend,
  onClickFavorite: OnClickFavoriteCallback
) => void

export const SHOW_UNFAVORITE_DIALOG = 'showUnfavoriteDialog'
export type OnClickUnfavoriteCallback = (friend: Friend) => void
export type ShowUnfavoriteDialog = (
  friend: Friend,
  onClickUnfavorite: OnClickUnfavoriteCallback
) => void

export const FAVORITE_FRIEND = 'favoriteFriend'
export type FavoriteFriend = (
  friend: Friend,
  group: FavoriteTag
) => Promise<void>

export const UNFAVORITE_FRIEND = 'unfavoriteFriend'
export type UnfavoriteFriend = (friend: Friend) => Promise<void>

export const GET_FRIEND_LOCATION = 'getFriendLocation'
export type GetFriendLocation = (
  location: InstanceLocation
) => FriendLocation | undefined
