export type UnixTime = number

export interface User {
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
