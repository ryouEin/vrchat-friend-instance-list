import * as vrcApi from '@/infras/network/vrcApi'
import { worldsModule } from '@/store/ModuleFactory'
import Storage from '@/libs/Storage/Storage'
import { World } from '@/types/ApiResponse'

jest.mock('@/libs/Storage/Storage')
const MockStorage = Storage as jest.Mock
const MockStorageImplementation = () => {
  const items: { [key: string]: string } = {}
  return {
    items,
    getItem(key: string): string {
      return this.items[key]
    },
    setItem(key: string, content: string) {
      this.items[key] = content
    },
  }
}

beforeEach(async () => {
  await worldsModule.clear()

  const dummyPopularWorlds: World[] = [
    {
      id: 'wrld_1',
      name: 'world 1',
      imageUrl: 'http://example.com/file1',
      thumbnailImageUrl: 'http://example.com/file1',
      capacity: 10,
    },
    {
      id: 'wrld_2',
      name: 'world 2',
      imageUrl: 'http://example.com/file2',
      thumbnailImageUrl: 'http://example.com/file2',
      capacity: 20,
    },
  ]
  jest
    .spyOn(vrcApi, 'fetchPopularWorlds')
    .mockResolvedValueOnce(dummyPopularWorlds)
  MockStorage.mockImplementationOnce(MockStorageImplementation)

  await worldsModule.init()
})

describe('init', () => {
  it('API及びストレージからデータを取得し設定する', async () => {
    expect(worldsModule.worlds).toEqual([
      {
        id: 'wrld_1',
        name: 'world 1',
        imageUrl: 'http://example.com/file1',
        thumbnailImageUrl: 'http://example.com/file1',
        capacity: 10,
        hardCapacity: 20,
      },
      {
        id: 'wrld_2',
        name: 'world 2',
        imageUrl: 'http://example.com/file2',
        thumbnailImageUrl: 'http://example.com/file2',
        capacity: 20,
        hardCapacity: 40,
      },
    ])
  })
})

describe('fetchWorld', () => {
  it('API及びストレージからデータを取得し設定する', async () => {
    const worldId = 'wrld_3'
    const dummyPopularWorld: World = {
      id: worldId,
      name: 'world 3',
      imageUrl: 'http://example.com/file3',
      thumbnailImageUrl: 'http://example.com/file3',
      capacity: 1,
    }

    jest
      .spyOn(vrcApi, 'memoizedFetchWorld')
      .mockResolvedValueOnce(dummyPopularWorld)
    MockStorage.mockImplementationOnce(MockStorageImplementation)

    await worldsModule.fetchWorld(worldId)

    expect(worldsModule.worlds).toEqual([
      {
        id: 'wrld_1',
        name: 'world 1',
        imageUrl: 'http://example.com/file1',
        thumbnailImageUrl: 'http://example.com/file1',
        capacity: 10,
        hardCapacity: 20,
      },
      {
        id: 'wrld_2',
        name: 'world 2',
        imageUrl: 'http://example.com/file2',
        thumbnailImageUrl: 'http://example.com/file2',
        capacity: 20,
        hardCapacity: 40,
      },
      {
        id: 'wrld_3',
        name: 'world 3',
        imageUrl: 'http://example.com/file3',
        thumbnailImageUrl: 'http://example.com/file3',
        capacity: 1,
        hardCapacity: 1,
      },
    ])
  })
})
