import * as vrcApi from '@/infras/network/vrcApi'
import { instancesModule } from '@/presentations/store/ModuleFactory'
import { Friend, Instance } from '@/types'

const dummyFriendData: Friend = {
  location: '',
  id: '0',
  username: '0',
  displayName: '0',
  currentAvatarImageUrl: '',
  currentAvatarThumbnailImageUrl: '',
  isFavorited: false,
  isNew: false,
}
const dummyFriends = [
  {
    ...dummyFriendData,
    location: 'wrld_1:1',
  },
  {
    ...dummyFriendData,
    location: 'wrld_2:1',
  },
  {
    ...dummyFriendData,
    location: 'wrld_1:1',
  },
  {
    ...dummyFriendData,
    location: 'wrld_3:18',
  },
]

beforeEach(async () => {
  await instancesModule.clear()
  await instancesModule.update(dummyFriends)
})

describe('update', () => {
  it('フレンドのlocationを元にinstancesが更新される', async () => {
    const expectInstances: Instance[] = [
      {
        location: 'wrld_1:1',
        worldId: 'wrld_1',
        isWatching: false,
        notifyUserNum: 1,
      },
      {
        location: 'wrld_2:1',
        worldId: 'wrld_2',
        isWatching: false,
        notifyUserNum: 1,
      },
      {
        location: 'wrld_3:18',
        worldId: 'wrld_3',
        isWatching: false,
        notifyUserNum: 1,
      },
    ]

    expect(instancesModule.instances).toEqual(expectInstances)
  })
})

describe('updateInstanceInfo', () => {
  it('インスタンスの状態をAPIから取得し、反映する', async () => {
    const location = 'wrld_1:1'
    jest.spyOn(vrcApi, 'fetchInstanceInfo').mockResolvedValueOnce({
      location: location,
      // eslint-disable-next-line @typescript-eslint/camelcase
      n_users: 10,
      capacity: 10,
    })

    await instancesModule.updateInstanceInfo(location)

    const expectInstances: Instance[] = [
      {
        location: 'wrld_1:1',
        worldId: 'wrld_1',
        isWatching: false,
        notifyUserNum: 1,
        userNum: 10,
      },
      {
        location: 'wrld_2:1',
        worldId: 'wrld_2',
        isWatching: false,
        notifyUserNum: 1,
      },
      {
        location: 'wrld_3:18',
        worldId: 'wrld_3',
        isWatching: false,
        notifyUserNum: 1,
      },
    ]

    expect(instancesModule.instances).toEqual(expectInstances)
  })

  it('updateが実行された際も、以前のuserNumは保持される', async () => {
    const location = 'wrld_1:1'
    jest.spyOn(vrcApi, 'fetchInstanceInfo').mockResolvedValueOnce({
      location: location,
      // eslint-disable-next-line @typescript-eslint/camelcase
      n_users: 10,
      capacity: 10,
    })

    await instancesModule.updateInstanceInfo(location)
    await instancesModule.update(dummyFriends)

    const expectInstances: Instance[] = [
      {
        location: 'wrld_1:1',
        worldId: 'wrld_1',
        isWatching: false,
        notifyUserNum: 1,
        userNum: 10,
      },
      {
        location: 'wrld_2:1',
        worldId: 'wrld_2',
        isWatching: false,
        notifyUserNum: 1,
      },
      {
        location: 'wrld_3:18',
        worldId: 'wrld_3',
        isWatching: false,
        notifyUserNum: 1,
      },
    ]

    expect(instancesModule.instances).toEqual(expectInstances)
  })
})

describe('watchInstance', () => {
  it('指定されたインスタンスが監視状態になる', async () => {
    const location = 'wrld_1:1'
    const onFindVacancy = jest.fn()
    await instancesModule.watchInstance({
      location,
      notifyUserNum: 10,
      onFindVacancy,
    })

    const expectedInstance: Instance = {
      location: 'wrld_1:1',
      worldId: 'wrld_1',
      isWatching: true,
      notifyUserNum: 10,
      onFindVacancy,
    }

    expect(instancesModule.instanceByLocation(location)).toEqual(
      expectedInstance
    )
  })
})

describe('unwatchInstance', () => {
  it('指定されたインスタンスが非監視状態になる', async () => {
    const location = 'wrld_1:1'
    const onFindVacancy = jest.fn()
    await instancesModule.watchInstance({
      location,
      notifyUserNum: 10,
      onFindVacancy,
    })

    await instancesModule.unwatchInstance(location)

    const expectedInstance: Instance = {
      location: 'wrld_1:1',
      worldId: 'wrld_1',
      isWatching: false,
      notifyUserNum: 10,
      onFindVacancy,
    }

    expect(instancesModule.instanceByLocation(location)).toEqual(
      expectedInstance
    )
  })
})

describe('checkWatchingInstanceVacancy', () => {
  const location = 'wrld_1:1'

  beforeEach(async () => {
    const notifyUserNum = 10
    const onFindVacancy = jest.fn()
    await instancesModule.watchInstance({
      location,
      notifyUserNum,
      onFindVacancy,
    })

    jest.spyOn(vrcApi, 'fetchInstanceInfo').mockResolvedValue({
      location: location,
      // eslint-disable-next-line @typescript-eslint/camelcase
      n_users: 10,
      capacity: 10,
    })
    await instancesModule.updateInstanceInfo(location)
  })

  it('指定されたインスタンスに指定ギリギリの空きがあった場合、onFindVacancyが実行されisWatchingがfalseとなる', async () => {
    await instancesModule.checkWatchingInstanceVacancy({
      location,
      hardCapacity: 20,
    })

    const instance = instancesModule.instanceByLocation(location)
    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }

    expect(instance.isWatching).toBe(false)
    expect(instance.onFindVacancy).toHaveBeenCalled()
  })

  it('指定されたインスタンスに指定の空きより1足らなかった場合、何も変わらない', async () => {
    await instancesModule.checkWatchingInstanceVacancy({
      location,
      hardCapacity: 19,
    })

    const instance = instancesModule.instanceByLocation(location)
    if (instance === undefined) {
      throw new Error('instance is undefined.')
    }

    expect(instance.isWatching).toBe(true)
    expect(instance.onFindVacancy).not.toHaveBeenCalled()
  })
})
