import { sortUsers } from '@/shame/sortUsers'
import { User } from '@/types'

describe('sortUsers', () => {
  const dummyData: User = {
    id: 'sample',
    username: 'sample',
    displayName: 'sample',
    currentAvatarImageUrl: 'sample',
    currentAvatarThumbnailImageUrl: 'sample',
    location: 'sample',
    isNew: false,
    isFavorited: false,
  }

  it('isNew, isFavorited, その他の順番でソートされている', () => {
    const result = sortUsers([
      {
        ...dummyData,
        displayName: 'user01',
        isNew: false,
        isFavorited: false,
      },
      {
        ...dummyData,
        displayName: 'user02',
        isNew: false,
        isFavorited: true,
      },
      {
        ...dummyData,
        displayName: 'user03',
        isNew: true,
        isFavorited: true,
      },
      {
        ...dummyData,
        displayName: 'user04',
        isNew: true,
        isFavorited: false,
      },
    ])
    expect(result).toEqual([
      {
        ...dummyData,
        displayName: 'user03',
        isNew: true,
        isFavorited: true,
      },
      {
        ...dummyData,
        displayName: 'user04',
        isNew: true,
        isFavorited: false,
      },
      {
        ...dummyData,
        displayName: 'user02',
        isNew: false,
        isFavorited: true,
      },
      {
        ...dummyData,
        displayName: 'user01',
        isNew: false,
        isFavorited: false,
      },
    ])
  })

  it('50音順でソートされている', () => {
    const result = sortUsers([
      {
        ...dummyData,
        displayName: 'あいう',
      },
      {
        ...dummyData,
        displayName: 'かきく',
      },
      {
        ...dummyData,
        displayName: 'abc',
      },
      {
        ...dummyData,
        displayName: 'def',
      },
      {
        ...dummyData,
        displayName: 'ABC',
      },
    ])
    expect(result).toEqual([
      {
        ...dummyData,
        displayName: 'abc',
      },
      {
        ...dummyData,
        displayName: 'ABC',
      },
      {
        ...dummyData,
        displayName: 'def',
      },
      {
        ...dummyData,
        displayName: 'あいう',
      },
      {
        ...dummyData,
        displayName: 'かきく',
      },
    ])
  })
})
