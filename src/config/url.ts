import { VRC_API_URL } from '@/config/env'
import { InstanceLocation } from '@/types'

export const VrcApiUrl = {
  getFetchInstanceUrl: (location: InstanceLocation) =>
    VRC_API_URL + `/api/1/instances/${location}`,
  getFetchFriendsUrl: () => VRC_API_URL + '/api/1/auth/user/friends',
  getFetchFavoritesUrl: () => VRC_API_URL + '/api/1/favorites',
  getFetchWorldUrl: (worldId: string) =>
    VRC_API_URL + `/api/1/worlds/${worldId}`,
  getFetchWorldsUrl: () => VRC_API_URL + `/api/1/worlds`,
  getInviteMeUrl: (location: InstanceLocation) =>
    VRC_API_URL + `/api/1/instances/${location}/invite`,
}
