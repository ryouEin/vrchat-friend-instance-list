export type MSecUnixTime = number

export type InstanceLocation = string

export const Regions = {
  JP: 'jp',
  US: 'us',
  USE: 'use',
  USW: 'usw',
  EU: 'eu',
} as const
export type Region = typeof Regions[keyof typeof Regions]

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
  Offline: 'offline',
  Unknown: 'unknown',
} as const
export type InstancePermission = typeof InstancePermissions[keyof typeof InstancePermissions]
