import * as GeneralType from '@/types'
import { FavoriteTag, InstanceLocation } from '@/types'

export type Friend = GeneralType.Friend & {
  canJoin: boolean
  isOwner: boolean
}

// ワールド情報は、必要になった時点で取得するようにしないと一気にリクエストが発行されてしまう
export type FriendLocation = {
  location: InstanceLocation
  instance?: GeneralType.Instance
  friends: Friend[]
}

export type FavoriteLimit = {
  name: FavoriteTag
  used: number
  capacity: number
}
