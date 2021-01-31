import { Favorite, Friend } from '../presentations/types'
import { sortUsers } from '../shame/sortUsers'

describe('sortUsers', () => {
  const dummyData: Friend = {
    id: 'sample',
    username: 'sample',
    displayName: 'sample',
    currentAvatarImageUrl: 'sample',
    currentAvatarThumbnailImageUrl: 'sample',
    location: 'sample',
    isNew: false,
    canJoin: false,
  }

  const dummyFavorite: Favorite = {
    id: 'dummy',
    favoriteId: 'dummy',
    tags: [],
    type: 'friend',
  }

  it('isFavorited, isNew, その他の順番でソートされている', () => {
    const result = sortUsers([
      {
        ...dummyData,
        displayName: 'user01',
        isNew: false,
      },
      {
        ...dummyData,
        displayName: 'user02',
        isNew: false,
        favorite: { ...dummyFavorite },
      },
      {
        ...dummyData,
        displayName: 'user03',
        isNew: true,
        favorite: { ...dummyFavorite },
      },
      {
        ...dummyData,
        displayName: 'user04',
        isNew: true,
      },
    ])
    expect(result).toEqual([
      {
        ...dummyData,
        displayName: 'user03',
        isNew: true,
        favorite: { ...dummyFavorite },
      },
      {
        ...dummyData,
        displayName: 'user02',
        isNew: false,
        favorite: { ...dummyFavorite },
      },
      {
        ...dummyData,
        displayName: 'user04',
        isNew: true,
      },
      {
        ...dummyData,
        displayName: 'user01',
        isNew: false,
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
