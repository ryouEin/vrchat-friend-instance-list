import { InstanceLocation } from '@/types/index'

export interface UserApiResponse {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: InstanceLocation
}

export interface WorldApiResponse {
  id: string
  name: string
  imageUrl: string
  thumbnailImageUrl: string
  capacity: number
}

export interface InstanceApiResponse {
  location: InstanceLocation
  n_users: number
  capacity: number
}

export interface FavoriteApiResponse {
  favoriteId: string
}

export interface NewsApiResponse {
  contents: {
    title: string
    content: string
    publishedAt: string
  }[]
}
