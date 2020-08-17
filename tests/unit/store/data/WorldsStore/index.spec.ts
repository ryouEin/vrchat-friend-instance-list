import { World } from '@/types/ApiResponse'
import { WorldsStore } from '@/store/data/WorldsStore'
import { IWorldsRepository } from '@/infras/Worlds/IWorldsRepository'

describe('initAction', () => {
  it('キャッシュから取得したデータがworldsに設定される', async () => {
    class MockWorldsRepository implements IWorldsRepository {
      async updateCacheByPopularWorlds(): Promise<void> {
        return
      }

      async getWorldsFromCache(): Promise<World[]> {
        return [
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
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line
      getWorld(worldId: string): Promise<World> {}
    }

    const mockWorldsRepository = new MockWorldsRepository()
    const worldsStore = new WorldsStore(mockWorldsRepository)
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
  it('永続化層からワールド情報を取得し、friendsに設定する', async () => {
    const worldId = 'wrld_3'
    const dummyPopularWorld = {
      id: worldId,
      name: 'world 3',
      imageUrl: 'http://example.com/file3',
      thumbnailImageUrl: 'http://example.com/file3',
      capacity: 1,
    }
    class MockWorldsRepository implements IWorldsRepository {
      async updateCacheByPopularWorlds(): Promise<void> {
        return
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line
      async getWorldsFromCache(): Promise<World[]> {}

      async getWorld(worldId: string): Promise<World> {
        return dummyPopularWorld
      }
    }

    const mockWorldsRepository = new MockWorldsRepository()
    const worldsStore = new WorldsStore(mockWorldsRepository)
    await worldsStore.fetchWorldAction(worldId)
    const expectWorlds = [
      {
        ...dummyPopularWorld,
        hardCapacity: 1,
      },
    ]

    expect(worldsStore.worlds).toEqual(expectWorlds)
  })
})
