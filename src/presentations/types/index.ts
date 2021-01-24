import * as GeneralType from '@/types'
import { Favorite, FavoriteTag, InstanceLocation } from '@/types'

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
  instance?: GeneralType.Instance
  friends: Friend[]
}

export type FavoriteLimit = {
  name: FavoriteTag
  used: number
  capacity: number
}
