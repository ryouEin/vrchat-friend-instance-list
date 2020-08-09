import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { World } from '@/types'
import * as ApiResponse from '@/types/ApiResponse'
import * as vrcApiService from '@/infras/network/vrcApi'
import { WorldStorage } from '@/infras/storage/World/WorldStorage'
import pMemoize from 'p-memoize'
import Storage from '@/libs/Storage/Storage'

const storage = new Storage()
const worldStorage = new WorldStorage(storage)

// TODO: memoizeした関数、ここにこういうふうに定義するので良いの？
const memFetchWorld = pMemoize(vrcApiService.fetchWorld, {
  maxAge: 10000,
})

// TODO SOON: VRChat関係のユーティリティ系の関数まとめたい
const calcWorldHardCapacity: (capacity: number) => number = capacity => {
  return capacity === 1 ? 1 : capacity * 2
}

const makeWorldFromApiResponse: (world: ApiResponse.World) => World = world => {
  return {
    ...world,
    hardCapacity: calcWorldHardCapacity(world.capacity),
  }
}

@Module({ namespaced: true, name: 'worlds' })
export default class WorldsStore extends VuexModule {
  private _worlds: World[] = []

  get worlds() {
    return this._worlds
  }

  get world() {
    return (id: string) => {
      return this._worlds.find(world => world.id === id)
    }
  }

  @Mutation
  private setWorlds(worlds: ApiResponse.World[]) {
    this._worlds = worlds.map(world => makeWorldFromApiResponse(world))
  }

  @Mutation
  private addWorld(world: ApiResponse.World) {
    // TODO: localStorageが満杯になった際の処理
    worldStorage.addWorld(world)
    this._worlds.push(makeWorldFromApiResponse(world))
  }

  @Action({ commit: 'addWorld', rawError: true })
  async fetchWorld(id: string) {
    return memFetchWorld(id)
  }

  @Action({ commit: 'setWorlds', rawError: true })
  async init() {
    const popularWorlds = await vrcApiService.fetchPopularWorlds()
    worldStorage.addWorlds(popularWorlds)

    return worldStorage.getWorlds()
  }
}
