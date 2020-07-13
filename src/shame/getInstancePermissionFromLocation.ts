/*
どこか適切な場所に置きたい
 */
import { InstancePermission } from '@/types'

export const getInstancePermissionFromLocation: (
  location: string
) => InstancePermission = location => {
  const [beforeColon, afterColon] = location.split(':')
  if (beforeColon === 'private') {
    return InstancePermission.Private
  }

  if (afterColon === undefined) {
    throw new Error(`unknown location: ${location}`)
  }

  if (afterColon.includes('hidden')) {
    return InstancePermission.FriendPlus
  }

  if (afterColon.includes('friends')) {
    return InstancePermission.Friends
  }

  if (afterColon.includes('public') || !afterColon.includes('~')) {
    return InstancePermission.Public
  }

  throw new Error(`unknown location: ${location}`)
}
