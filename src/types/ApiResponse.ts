export interface User {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: string
}

export interface World {
  id: string
  name: string
  imageUrl: string
  thumbnailImageUrl: string
  capacity: number
}

export interface InstanceInfo {
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
