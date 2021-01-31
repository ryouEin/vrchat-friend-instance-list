import {
  FavoriteTag,
  FavoriteType,
  InstanceLocation,
  InstancePermission,
  MSecUnixTime,
} from '../../types'
import { Color, Theme } from '../Colors'

export type World = {
  id: string
  name: string
  imageUrl: string
  thumbnailImageUrl: string
  capacity: number
  hardCapacity: number
}

export type News = {
  title: string
  content: string
  publishedAt: MSecUnixTime
}

export type Notification = {
  text: string
  date: MSecUnixTime
  onClick: () => void
}

export type Setting = {
  enableNotificationSound: boolean
  theme: Theme
  mainColor: Color
}

export type Instance = {
  id: string
  worldId: string
  permission: InstancePermission
  ownerId?: string
  userNum?: number
}

export type Favorite = {
  id: string
  favoriteId: string
  tags: FavoriteTag[]
  type: FavoriteType
}

export type Friend = {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: InstanceLocation
  favorite?: Favorite
  isNew: boolean
  canJoin: boolean
}

// ワールド情報は、必要になった時点で取得するようにしないと一気にリクエストが発行されてしまう
export type FriendLocation = {
  id: string
  instance?: Instance
  friends: Friend[]
}

export type FavoriteLimit = {
  name: FavoriteTag
  used: number
  capacity: number
}

export type InstanceUserNum = {
  instanceId: string
  userNum: number
}

export type WatchingInstance = {
  instanceId: string
  notifyFreeSpaceNum: number
}
