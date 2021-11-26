import { getInstancePermissionFromLocation } from './getInstancePermissionFromLocation'
import { InstancePermissions } from '../types'

describe('getInstancePermissionFromLocation', () => {
  it('privateパターン', () => {
    const result = getInstancePermissionFromLocation('private')

    expect(result).toBe(InstancePermissions.Private)
  })

  it('friend+パターン', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_1:123~hidden(usr_0)~nonce(hogehoge)'
    )

    expect(result).toBe(InstancePermissions.FriendPlus)
  })

  it('friendsパターン', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_1:123~friends(usr_0)~nonce(hogehoge)'
    )

    expect(result).toBe(InstancePermissions.Friends)
  })

  it('invite+パターン', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_1:123~private(usr_678)~canRequestInvite~nonce(90)'
    )

    expect(result).toBe(InstancePermissions.InvitePlus)
  })

  it('inviteパターン', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_1:123~private(usr_678)~nonce(90)'
    )

    expect(result).toBe(InstancePermissions.Invite)
  })

  it('publicパターン', () => {
    const result = getInstancePermissionFromLocation('wrld_1:123')

    expect(result).toBe(InstancePermissions.Public)
  })

  it('publicパターン(regionあり)', () => {
    const result = getInstancePermissionFromLocation('wrld_1:123~region(jp)')

    expect(result).toBe(InstancePermissions.Public)
  })

  it('offlineの時はOffline', () => {
    const result = getInstancePermissionFromLocation('offline')

    expect(result).toBe(InstancePermissions.Offline)
  })

  it('空文字の時はOffline', () => {
    const result = getInstancePermissionFromLocation('')

    expect(result).toBe(InstancePermissions.Offline)
  })

  it('InstanceIDがなく、privateでもofflineでもなかった際は例外', () => {
    expect(() => {
      getInstancePermissionFromLocation('unknown_permission')
    }).toThrow()
  })

  it('なんかよくわからない想定外の文字列の時はunknown', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_011:rheaitja~etijaerhet'
    )

    expect(result).toBe(InstancePermissions.Unknown)
  })
})
