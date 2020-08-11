import * as vrcApi from '@/infras/network/vrcApi'
import { friendsModule } from '@/store/ModuleFactory'
import { User } from '@/types/ApiResponse'
import { Friend } from '@/types'

const generateDummyFriends = (count: number) => {
  const dummyFriends: User[] = []

  for (let index = 0; index < count; index++) {
    dummyFriends.push({
      id: `${index}`,
      username: `username ${index}`,
      displayName: `displayName ${index}`,
      currentAvatarImageUrl: ``,
      currentAvatarThumbnailImageUrl: ``,
      location: ``,
    })
  }

  return dummyFriends
}

beforeEach(async () => {
  await friendsModule.clear()
})

describe('fetchFriends', () => {
  it('APIから取得したフレンドデータを取得できる', async () => {
    const dummyData: User[] = generateDummyFriends(310)
    jest
      .spyOn(vrcApi, 'fetchFriends')
      .mockResolvedValueOnce(dummyData.slice(0, 100))
      .mockResolvedValueOnce(dummyData.slice(100, 200))
      .mockResolvedValueOnce(dummyData.slice(200, 300))
      .mockResolvedValueOnce(dummyData.slice(300, 400))
      .mockResolvedValue([])
    jest.spyOn(vrcApi, 'fetchFavoriteFriends').mockResolvedValueOnce([])

    await friendsModule.fetchFriends()
    expect(friendsModule.friends).toEqual(
      dummyData.map(item => ({
        ...item,
        isNew: false,
        isFavorited: false,
      }))
    )
  })

  it('Favorite登録されているユーザーはisFavoritedがtrueになる', async () => {
    const dummyData: User[] = generateDummyFriends(310)
    jest
      .spyOn(vrcApi, 'fetchFriends')
      .mockResolvedValueOnce(dummyData.slice(0, 100))
      .mockResolvedValueOnce(dummyData.slice(100, 200))
      .mockResolvedValueOnce(dummyData.slice(200, 300))
      .mockResolvedValueOnce(dummyData.slice(300, 400))
      .mockResolvedValue([])
    jest.spyOn(vrcApi, 'fetchFavoriteFriends').mockResolvedValueOnce([
      {
        favoriteId: '10',
      },
      {
        favoriteId: '123',
      },
    ])

    await friendsModule.fetchFriends()
    expect(friendsModule.friends).toEqual(
      dummyData.map<Friend>(item => {
        return {
          ...item,
          isNew: false,
          isFavorited: item.id === '10' || item.id === '123',
        }
      })
    )
  })

  it('複数回呼ばれた場合、いなくなったユーザーのデータは消え、新しくログインしたユーザーはisNewがtrueになる', async () => {
    const dummyData: User[] = generateDummyFriends(310)
    jest
      .spyOn(vrcApi, 'fetchFriends')
      .mockResolvedValueOnce(dummyData.slice(0, 200))
      .mockResolvedValue([])
    jest.spyOn(vrcApi, 'fetchFavoriteFriends').mockResolvedValueOnce([])

    await friendsModule.fetchFriends()

    jest
      .spyOn(vrcApi, 'fetchFriends')
      .mockResolvedValueOnce(dummyData.slice(100, 200))
      .mockResolvedValueOnce(dummyData.slice(200, 300))
      .mockResolvedValueOnce(dummyData.slice(300, 400))
      .mockResolvedValue([])
    jest.spyOn(vrcApi, 'fetchFavoriteFriends').mockResolvedValueOnce([])

    await friendsModule.fetchFriends()

    expect(friendsModule.friends).toEqual(
      dummyData.slice(100, 400).map<Friend>(item => {
        return {
          ...item,
          isNew: Number(item.id) >= 200,
          isFavorited: false,
        }
      })
    )
  })
})
