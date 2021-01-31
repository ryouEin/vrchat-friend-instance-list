import { convertUnixTimeToISO8601ExtendedUTC } from './Utils'

describe('convertUnixTimeToISO8601ExtendedUTC', () => {
  it('UnixTimeをISO8601拡張形式（UTC）に変換する', () => {
    const result = convertUnixTimeToISO8601ExtendedUTC(1593928747624)

    expect(result).toBe('2020-07-05T05:59:07.624Z')
  })
})
