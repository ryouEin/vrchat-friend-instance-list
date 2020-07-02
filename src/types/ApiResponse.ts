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
}

export interface Favorite {
  favoriteId: string
}
