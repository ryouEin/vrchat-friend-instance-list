import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { World } from '@/types'
import * as ApiResponse from '@/types/ApiResponse'
import * as vrcApiService from '@/infras/network/vrcApi'
import { WorldStorage } from '@/infras/storage/World/WorldStorage'
import Storage from '@/libs/Storage/Storage'
import { memoizedFetchWorld } from '@/infras/network/vrcApi'
import { calcWorldHardCapacity } from '@/shame/calcWorldHardCapacity'

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
    const worldStorage = new WorldStorage(new Storage())
    worldStorage.addWorld(world)

    this._worlds.push(makeWorldFromApiResponse(world))
  }

  @Mutation
  private clearWorlds() {
    this._worlds = []
  }

  @Action({ commit: 'addWorld', rawError: true })
  async fetchWorld(id: string) {
    return memoizedFetchWorld(id)
  }

  @Action({ commit: 'setWorlds', rawError: true })
  async init() {
    const popularWorlds = await vrcApiService.fetchPopularWorlds()

    const worldStorage = new WorldStorage(new Storage())
    worldStorage.addWorlds(popularWorlds)

    return worldStorage.getWorlds()
  }

  @Action({ rawError: true })
  async clear() {
    this.context.commit('clearWorlds')
  }
}
