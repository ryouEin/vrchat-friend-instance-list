import IKeyValueStorage from '@/libs/Storage/IKeyValueStorage'
import { CacheWorldsRepository } from '@/infras/Worlds/CacheWorldsRepository'

class MockStorage implements IKeyValueStorage {
  constructor(private _dictionary: { [key: string]: string }) {}

  // eslint-disable-next-line
  clear(): void {}

  getItem(key: string): string | undefined {
    return this._dictionary[key]
  }

  setItem(key: string, content: string): void {
    this._dictionary[key] = content
  }
}

describe('addWorlds', () => {
  it('ID重複は除去した上で追加される', async () => {
    const initialData = {
      worldData: JSON.stringify([
        {
          id: 'wrld_0',
          name: 'world 0',
          imageUrl: 'http://example.com',
          thumbnailImageUrl: 'http://example.com',
          capacity: 10,
        },
        {
          id: 'wrld_2',
          name: 'world 2',
          imageUrl: 'http://example.com',
          thumbnailImageUrl: 'http://example.com',
          capacity: 10,
        },
      ]),
    }
    const appendData = [
      {
        id: 'wrld_0',
        name: 'world 0',
        imageUrl: 'http://example.com',
        thumbnailImageUrl: 'http://example.com',
        capacity: 10,
      },
      {
        id: 'wrld_1',
        name: 'world 1',
        imageUrl: 'http://example.com',
        thumbnailImageUrl: 'http://example.com',
        capacity: 10,
      },
    ]
    const worldStorage = new CacheWorldsRepository(new MockStorage(initialData))
    await worldStorage.addWorlds(appendData)
    const result = await worldStorage.getWorlds()

    expect(result).toEqual([
      {
        id: 'wrld_0',
        name: 'world 0',
        imageUrl: 'http://example.com',
        thumbnailImageUrl: 'http://example.com',
        capacity: 10,
      },
      {
        id: 'wrld_1',
        name: 'world 1',
        imageUrl: 'http://example.com',
        thumbnailImageUrl: 'http://example.com',
        capacity: 10,
      },
      {
        id: 'wrld_2',
        name: 'world 2',
        imageUrl: 'http://example.com',
        thumbnailImageUrl: 'http://example.com',
        capacity: 10,
      },
    ])
  })

  it('データが1000件を超える場合、1000件になるように古いデータが削除される', async () => {
    const worldStorage = new CacheWorldsRepository(new MockStorage({}))
    for (let index = 0; index < 1000; index++) {
      await worldStorage.addWorlds([
        {
          id: `wrld_${index}`,
          name: `world ${index}`,
          imageUrl: 'http://example.com',
          thumbnailImageUrl: 'http://example.com',
          capacity: 10,
        },
      ])
    }
    const result1 = await worldStorage.getWorlds()
    expect(result1.length).toBe(1000)
    expect(result1).toEqual(
      expect.arrayContaining([
        {
          id: `wrld_0`,
          name: `world 0`,
          imageUrl: 'http://example.com',
          thumbnailImageUrl: 'http://example.com',
          capacity: 10,
        },
      ])
    )

    await worldStorage.addWorlds([
      {
        id: `wrld_1000`,
        name: `world 1000`,
        imageUrl: 'http://example.com',
        thumbnailImageUrl: 'http://example.com',
        capacity: 10,
      },
    ])
    const result2 = await worldStorage.getWorlds()
    expect(result2.length).toBe(1000)
    expect(result2).not.toEqual(
      expect.arrayContaining([
        {
          id: `wrld_0`,
          name: `world 0`,
          imageUrl: 'http://example.com',
          thumbnailImageUrl: 'http://example.com',
        },
      ])
    )
  })
})
