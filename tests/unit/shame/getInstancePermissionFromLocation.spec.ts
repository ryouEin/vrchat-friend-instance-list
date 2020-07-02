import { getInstancePermissionFromLocation } from '@/shame/getInstancePermissionFromLocation'
import { InstancePermission } from '@/types/InstancePermission'

describe('getInstancePermissionFromLocation', () => {
  it('「private」がPrivateと判定される', () => {
    const result = getInstancePermissionFromLocation('private')
    expect(result).toBe(InstancePermission.Private)
  })

  it('「wrld_123:45~hidden(usr_678)~nonce(90)」がFriend+と判定される', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_123:45~hidden(usr_678)~nonce(90)'
    )
    expect(result).toBe(InstancePermission.FriendPlus)
  })

  it('「wrld_123:45~friends(usr_678)~nonce(90)」がFriend+と判定される', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_123:45~friends(usr_678)~nonce(90)'
    )
    expect(result).toBe(InstancePermission.Friends)
  })

  it('「wrld_123:45~public(usr_678)」がPublicと判定される', () => {
    const result = getInstancePermissionFromLocation(
      'wrld_123:45~public(usr_678)'
    )
    expect(result).toBe(InstancePermission.Public)
  })

  it('「wrld_123:45」がPublicと判定される', () => {
    const result = getInstancePermissionFromLocation('wrld_123:45')
    expect(result).toBe(InstancePermission.Public)
  })

  it('どの条件にも当てはまらない際に例外が投げられる', () => {
    expect(() => {
      getInstancePermissionFromLocation('unknown')
    }).toThrow()
  })
})
