export type MSecUnixTime = number

export type InstanceLocation = string

export const FavoriteType = {
  World: 'world',
  Friend: 'friend',
  Avatar: 'avatar',
} as const
export type FavoriteType = typeof FavoriteType[keyof typeof FavoriteType]

export const FavoriteTag = {
  Group0: 'group_0',
  Group1: 'group_1',
  Group2: 'group_2',
} as const
export type FavoriteTag = typeof FavoriteTag[keyof typeof FavoriteTag]

export const InstancePermission = {
  Private: 'private',
  Public: 'public',
  Friends: 'friends',
  FriendPlus: 'friend+',
  Invite: 'invite',
  InvitePlus: 'invite+',
  Unknown: 'unknown',
} as const
export type InstancePermission = typeof InstancePermission[keyof typeof InstancePermission]
