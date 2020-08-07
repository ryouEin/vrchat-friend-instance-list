// TODO: typeとinterfaceの使い分け方針決める
export type UnixTime = number

export interface Friend {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: string
  isFavorited: boolean
  isNew: boolean
}

export interface World {
  id: string
  name: string
  imageUrl: string
  thumbnailImageUrl: string
  capacity: number
}

export const InstancePermission = {
  Private: 'private',
  Public: 'public',
  Friends: 'friends',
  FriendPlus: 'friend+',
  Unknown: 'unknown',
} as const
export type InstancePermission = typeof InstancePermission[keyof typeof InstancePermission]

export interface News {
  title: string
  content: string
  publishedAt: UnixTime
}

export type Notification = {
  text: string
  date: UnixTime
  onClick: () => void
}

export type Setting = {
  enableNotificationSound: boolean
}

export type InstanceDetail = {
  location: string
  friends: Friend[]
}

export type Instance = {
  location: string
  isWatching: boolean
  notifyUserNum: number
  userNum?: number
  hardCapacity?: number
  callback?: () => void
}
