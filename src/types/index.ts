export type MSecUnixTime = number

export type InstanceLocation = string

export const FavoriteTypes = {
  World: 'world',
  Friend: 'friend',
  Avatar: 'avatar',
} as const
export type FavoriteType = typeof FavoriteTypes[keyof typeof FavoriteTypes]

export const FavoriteTags = {
  Group0: 'group_0',
  Group1: 'group_1',
  Group2: 'group_2',
} as const
export type FavoriteTag = typeof FavoriteTags[keyof typeof FavoriteTags]

export const InstancePermissions = {
  Private: 'private',
  Public: 'public',
  Friends: 'friends',
  FriendPlus: 'friend+',
  Invite: 'invite',
  InvitePlus: 'invite+',
  Unknown: 'unknown',
} as const
export type InstancePermission = typeof InstancePermissions[keyof typeof InstancePermissions]
