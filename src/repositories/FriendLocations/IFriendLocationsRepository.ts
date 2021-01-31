import { InstanceLocation } from '../../types'
import { Instance } from '../../presentations/types'

export type FriendLocation = {
  id: string
  instance?: Instance
  friends: Friend[]
}

export type Friend = {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  location: InstanceLocation
  canJoin: boolean
}

export interface IFriendLocationsRepository {
  fetchFriendLocations(): Promise<FriendLocation[]>
}
