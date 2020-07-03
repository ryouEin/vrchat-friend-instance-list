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
