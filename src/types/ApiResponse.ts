import { InstanceLocation } from '@/types/index'

export interface User {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: InstanceLocation
}

export interface World {
  id: string
  name: string
  imageUrl: string
  thumbnailImageUrl: string
  capacity: number
}

export interface InstanceInfo {
  location: InstanceLocation
  n_users: number
  capacity: number
}

export interface Favorite {
  favoriteId: string
}

export interface News {
  contents: {
    title: string
    content: string
    publishedAt: string
  }[]
}
