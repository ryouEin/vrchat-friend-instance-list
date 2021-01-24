import * as GeneralType from '@/types'
import { FavoriteTag } from '@/types'

export type Friend = GeneralType.Friend & {
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
