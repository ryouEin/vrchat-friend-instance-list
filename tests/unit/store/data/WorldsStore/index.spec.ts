import { World } from '@/types/ApiResponse'
import { WorldsStore } from '@/store/data/WorldsStore'
import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'
import { ICacheWorldsRepository } from '@/infras/Worlds/ICacheWorldsRepository'

class MockNetworkRepository implements INetworkWorldsRepository {
  constructor(
    public worlds: World[] = [],
    public popularWorlds: World[] = []
  ) {}

  async fetchPopularWorlds(): Promise<World[]> {
    return this.popularWorlds
  }

  async fetchWorld(worldId: string): Promise<World> {
    const world = this.worlds.find(world => world.id === worldId)

    if (world === undefined) {
      throw new Error('world is undefined.')
    }

    return world
  }
}

class MockCacheWorldsRepository implements ICacheWorldsRepository {
  constructor(public worlds: World[] = []) {}

  async getWorlds(): Promise<World[]> {
    return this.worlds
  }

  async addWorlds(worlds: World[]): Promise<void> {
    this.worlds = this.worlds.concat(worlds)
  }

  async addWorld(world: World): Promise<void> {
    this.worlds.push(world)
  }
}

describe('initAction', () => {
  it('キャッシュから取得したデータがworldsに設定される', async () => {
    const mockNetworkRepository = new MockNetworkRepository()
    const mockCacheWorldsRepository = new MockCacheWorldsRepository([
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
    ])
    const worldsStore = new WorldsStore(
      mockNetworkRepository,
      mockCacheWorldsRepository
    )
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
  it('ネットワークからワールド情報を取得し、worldsに設定する', async () => {
    const worldId = 'wrld_3'
    const dummyPopularWorld = {
      id: worldId,
      name: 'world 3',
      imageUrl: 'http://example.com/file3',
      thumbnailImageUrl: 'http://example.com/file3',
      capacity: 1,
    }

    const mockNetworkRepository = new MockNetworkRepository([dummyPopularWorld])
    const mockCacheWorldsRepository = new MockCacheWorldsRepository()
    const worldsStore = new WorldsStore(
      mockNetworkRepository,
      mockCacheWorldsRepository
    )
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
