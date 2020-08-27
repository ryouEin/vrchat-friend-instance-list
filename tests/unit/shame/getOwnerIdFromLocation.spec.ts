import { getOwnerIdFromLocation } from '@/shame/getOwnerIdFromLocation'

describe('getOwnerIdFromLocation', () => {
  it('private: 「private」だとundefinedが返却', () => {
    const result = getOwnerIdFromLocation('private')
    expect(result).toBe(undefined)
  })

  it('friend+: 「wrld_123:45~hidden(usr_678)~nonce(90)」だと「usr_678」が返却', () => {
    const result = getOwnerIdFromLocation(
      'wrld_123:45~hidden(usr_678)~nonce(90)'
    )
    expect(result).toBe('usr_678')
  })

  it('friends: 「wrld_123:45~friends(usr_678)~nonce(90)」だと「usr_678」が返却', () => {
    const result = getOwnerIdFromLocation(
      'wrld_123:45~friends(usr_678)~nonce(90)'
    )
    expect(result).toBe('usr_678')
  })

  it('オーナーありpublic: 「wrld_123:45~public(usr_678)」だと「usr_678」が返却', () => {
    const result = getOwnerIdFromLocation('wrld_123:45~public(usr_678)')
    expect(result).toBe('usr_678')
  })

  it('オーナーなしpublic: 「wrld_123:45」だとundefinedが返却', () => {
    const result = getOwnerIdFromLocation('wrld_123:45')
    expect(result).toBe(undefined)
  })
})
