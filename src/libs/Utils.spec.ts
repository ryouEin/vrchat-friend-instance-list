import {
  convertUnixTimeToISO8601ExtendedUTC,
  unionWith,
  uniqWith,
} from './Utils'

describe('convertUnixTimeToISO8601ExtendedUTC', () => {
  it('UnixTimeをISO8601拡張形式（UTC）に変換する', () => {
    const result = convertUnixTimeToISO8601ExtendedUTC(1593928747624)

    expect(result).toBe('2020-07-05T05:59:07.624Z')
  })
})

describe('unionWith', () => {
  it('comparatorから重複要素と判断された要素は重複しない。第２引数側の要素が無視される。', () => {
    type Item = {
      id: string
      content: string
    }
    const newItems: Item[] = [
      {
        id: '1',
        content: 'hoge',
      },
      {
        id: '2',
        content: 'foo',
      },
    ]
    const oldItems: Item[] = [
      {
        id: '1',
        content: 'fuga',
      },
      {
        id: '3',
        content: 'bar',
      },
    ]

    const result = unionWith<Item>(newItems, oldItems, (a, b) => a.id === b.id)

    expect(result).toEqual([
      {
        id: '1',
        content: 'hoge',
      },
      {
        id: '2',
        content: 'foo',
      },
      {
        id: '3',
        content: 'bar',
      },
    ])
  })

  it('空要素同士の場合、空要素が返却される', () => {
    type Item = {
      id: string
      content: string
    }
    const newItems: Item[] = []
    const oldItems: Item[] = []

    const result = unionWith<Item>(newItems, oldItems, (a, b) => a.id === b.id)

    expect(result).toEqual([])
  })
})

describe('uniqWith', () => {
  it('重複要素が取り除かれる。取り除かれるのは後から出現する要素である。', () => {
    const result = uniqWith(
      [
        {
          id: '1',
          content: 'hoge',
        },
        {
          id: '2',
          content: 'fuga',
        },
        {
          id: '1',
          content: 'foo',
        },
      ],
      (a, b) => a.id === b.id
    )

    expect(result).toEqual([
      {
        id: '1',
        content: 'hoge',
      },
      {
        id: '2',
        content: 'fuga',
      },
    ])
  })
})
