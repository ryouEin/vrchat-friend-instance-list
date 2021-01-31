import { getOwnerIdFromLocation } from './getOwnerIdFromLocation'

describe('getOwnerIdFromLocation', () => {
  it('wrld_1:123~hidden(usr_0)~nonce(hogehoge)に対してusr_0を返す', () => {
    const result = getOwnerIdFromLocation(
      'wrld_1:123~hidden(usr_0)~nonce(hogehoge)'
    )

    expect(result).toBe('usr_0')
  })

  it('privateに対してundefinedを返す', () => {
    const result = getOwnerIdFromLocation('private')

    expect(result).toBe(undefined)
  })
})
