import { InstanceLocation, InstancePermission } from '@/types'

export type FriendLocation = {
  id: string
  instance?: Instance
  friends: Friend[]
}

export type Instance = {
  id: string
  permission: InstancePermission
  worldId: string
  ownerId?: string
  userNum?: number
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
