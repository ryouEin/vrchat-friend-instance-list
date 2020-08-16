import * as vrcApi from '@/infras/network/vrcApi'
import { World } from '@/types/ApiResponse'
import { IWorldStorage } from '@/infras/storage/World/IWorldStorage'
import { WorldsStore } from '@/store/data/WorldsStore'

class MockWorldStorage implements IWorldStorage {
  constructor(public items: World[] = []) {}

  async getWorlds(): Promise<World[]> {
    return this.items
  }

  async addWorld(world: World): Promise<void> {
    this.items.push(world)
  }

  async addWorlds(worlds: World[]): Promise<void> {
    this.items = this.items.concat(worlds)
  }
}

describe('initAction', () => {
  it('API及びストレージからデータを取得し設定する', async () => {
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

    const mockWorldStorage = new MockWorldStorage()
    const worldsStore = new WorldsStore(mockWorldStorage)
    await worldsStore.initAction()

    expect(worldsStore.worlds).toEqual([
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
  it('API及びストレージからデータを取得しworldsが更新される', async () => {
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

    const mockWorldStorage = new MockWorldStorage()
    const worldsStore = new WorldsStore(mockWorldStorage)
    await worldsStore.fetchWorldAction(worldId)
    const expectWorlds = [
      {
        ...dummyPopularWorld,
        hardCapacity: 1,
      },
    ]

    expect(worldsStore.worlds).toEqual(expectWorlds)

    const storageWorlds = await mockWorldStorage.getWorlds()
    expect(storageWorlds).toEqual([dummyPopularWorld])
  })
})
