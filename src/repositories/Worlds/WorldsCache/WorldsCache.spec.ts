import { WorldsCache } from './WorldsCache'
import { InMemoryKeyValueStorage } from '../../../libs/Storage/InMemoryKeyValueStorage'
import { advanceTo } from 'jest-date-mock'

const STORAGE_KEY = 'example'
const CACHE_VERSION = '1'

const REPOSITORY_DEFAULT_OPTIONS = {
  storageKey: STORAGE_KEY,
  cacheVersion: CACHE_VERSION,
  maxAgeMSec: 1000 * 60 * 60 * 24 * 7, // 1週間
  maxNum: 1000,
}

const dummyWorldData = {
  id: 'wrld_01',
  name: 'world 01',
  imageUrl: 'https://example.com',
  thumbnailImageUrl: 'https://example.com',
  capacity: 10,
}

describe('getWorlds', () => {
  it('期限内のデータは全て返却される', async () => {
    const currentMSecUnixTime = 1610452388164
    advanceTo(currentMSecUnixTime)
    const world01 = {
      updatedAt: currentMSecUnixTime,
      data: { ...dummyWorldData },
    }
    const world02 = {
      updatedAt: currentMSecUnixTime,
      data: {
        ...dummyWorldData,
        id: 'wrld_02',
      },
    }
    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    inMemoryKeyValueStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CACHE_VERSION,
        data: [world01, world02],
      })
    )
    const repository = new WorldsCache(
      inMemoryKeyValueStorage,
      REPOSITORY_DEFAULT_OPTIONS
    )

    const result = await repository.getWorlds()

    expect(result).toEqual([
      {
        ...world01.data,
      },
      {
        ...world02.data,
      },
    ])
  })

  it('ストレージに対応するデータが存在しない場合は空配列が返却される', async () => {
    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    const repository = new WorldsCache(
      inMemoryKeyValueStorage,
      REPOSITORY_DEFAULT_OPTIONS
    )

    const result = await repository.getWorlds()

    expect(result).toEqual([])
  })

  it('データのバージョン情報が異なる場合は空配列が返却される', async () => {
    const currentMSecUnixTime = 1610452388164
    advanceTo(currentMSecUnixTime)
    const world01 = {
      updatedAt: currentMSecUnixTime,
      data: { ...dummyWorldData },
    }
    const world02 = {
      updatedAt: currentMSecUnixTime,
      data: {
        ...dummyWorldData,
        id: 'wrld_02',
      },
    }
    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    inMemoryKeyValueStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: 'wrong_version',
        data: [world01, world02],
      })
    )
    const repository = new WorldsCache(
      inMemoryKeyValueStorage,
      REPOSITORY_DEFAULT_OPTIONS
    )

    const result = await repository.getWorlds()

    expect(result).toEqual([])
  })

  it('1週間前以上のデータはストレージから削除され、それを除いたデータが返却される', async () => {
    const todayMSecUnixTime = new Date(2021, 1, 20, 0, 0, 0, 0).getTime()
    const oneWeekAgoMSecUnixTime = new Date(2021, 1, 13, 0, 0, 0, 0).getTime()
    advanceTo(todayMSecUnixTime)

    const shouldDeleteWorldData = {
      updatedAt: oneWeekAgoMSecUnixTime,
      data: {
        ...dummyWorldData,
        id: 'wrld_should_delete',
      },
    }
    const shouldNotDeleteWorldData = {
      updatedAt: oneWeekAgoMSecUnixTime + 1,
      data: {
        ...dummyWorldData,
        id: 'wrld_should_not_delete',
      },
    }

    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    inMemoryKeyValueStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CACHE_VERSION,
        data: [shouldDeleteWorldData, shouldNotDeleteWorldData],
      })
    )
    const repository = new WorldsCache(
      inMemoryKeyValueStorage,
      REPOSITORY_DEFAULT_OPTIONS
    )

    const result = await repository.getWorlds()

    expect(result).toEqual([{ ...shouldNotDeleteWorldData.data }])

    const inStorage = JSON.parse(inMemoryKeyValueStorage.getItem(STORAGE_KEY)!)
    expect(inStorage).toEqual({
      version: CACHE_VERSION,
      data: [shouldNotDeleteWorldData],
    })
  })
})

describe('addWorlds', () => {
  it('渡されたデータが保存される', async () => {
    const world01 = { ...dummyWorldData }
    const world02 = {
      ...dummyWorldData,
      id: 'wrld_02',
    }
    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    const repository = new WorldsCache(
      inMemoryKeyValueStorage,
      REPOSITORY_DEFAULT_OPTIONS
    )

    await repository.addWorlds([world01, world02])
    const result = await repository.getWorlds()

    expect(result).toEqual([world01, world02])
  })

  it('既にデータが存在している場合、ワールドデータ及びupdatedAtが更新される', async () => {
    const oldDataMSecUnixTime = new Date(2021, 1, 20, 0, 0, 0, 0).getTime()
    const newDataMSecUnixTime = new Date(2021, 1, 13, 0, 0, 0, 0).getTime()

    advanceTo(newDataMSecUnixTime)

    const world01 = { ...dummyWorldData }
    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    inMemoryKeyValueStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CACHE_VERSION,
        data: [
          {
            updatedAt: oldDataMSecUnixTime,
            data: { ...world01 },
          },
        ],
      })
    )
    const repository = new WorldsCache(
      inMemoryKeyValueStorage,
      REPOSITORY_DEFAULT_OPTIONS
    )

    await repository.addWorlds([world01])
    const item = inMemoryKeyValueStorage.getItem(STORAGE_KEY)
    if (item === undefined) {
      throw new Error('item is undefined.')
    }
    const result = JSON.parse(item).data

    expect(result).toEqual([
      {
        updatedAt: newDataMSecUnixTime,
        data: { ...world01 },
      },
    ])
  })

  it('実行後、データの数が指定された値を超える場合古いデータが削除される', async () => {
    const currentMSecUnixTime = new Date(2020, 0, 1, 0, 0, 0, 0).getTime()
    advanceTo(currentMSecUnixTime)

    const world01 = { ...dummyWorldData }
    const world02 = { ...dummyWorldData, id: 'wrld_02' }
    const world03 = { ...dummyWorldData, id: 'wrld_03' }
    const world04 = { ...dummyWorldData, id: 'wrld_04' }
    const dataWillDelete = {
      updatedAt: currentMSecUnixTime - 1000,
      data: { ...world01 },
    }
    const dataWillRemain1 = {
      updatedAt: currentMSecUnixTime - 999,
      data: { ...world02 },
    }
    const dataWillRemain2 = {
      updatedAt: currentMSecUnixTime - 998,
      data: { ...world03 },
    }

    const oldData = []
    oldData.push(dataWillDelete)
    oldData.push(dataWillRemain1)
    oldData.push(dataWillRemain2)

    const inMemoryKeyValueStorage = new InMemoryKeyValueStorage()
    inMemoryKeyValueStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        version: CACHE_VERSION,
        data: [...oldData],
      })
    )
    const repository = new WorldsCache(inMemoryKeyValueStorage, {
      ...REPOSITORY_DEFAULT_OPTIONS,
      maxNum: 3,
    })
    await repository.addWorlds([world04])

    const result = await repository.getWorlds()

    expect(result).toEqual([world04, world03, world02])
  })
})
