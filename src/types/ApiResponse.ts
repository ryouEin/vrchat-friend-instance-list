import { FavoriteTag, FavoriteType, InstanceLocation } from './'

export type UserApiResponse = {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: InstanceLocation
}

export type WorldApiResponse = {
  id: string
  name: string
  imageUrl: string
  thumbnailImageUrl: string
  capacity: number
}

export type InstanceApiResponse = {
  location: InstanceLocation
  n_users: number
  capacity: number
}

export type FavoriteApiResponse = {
  id: string
  favoriteId: string
  tags: FavoriteTag[]
  type: FavoriteType
}

export type NewsApiResponse = {
  contents: {
    title: string
    content: string
    publishedAt: string
  }[]
}
