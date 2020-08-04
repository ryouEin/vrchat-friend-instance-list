import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { World } from '@/types'
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
  private setWorlds(worlds: World[]) {
    this._worlds = worlds
  }

  @Mutation
  private addWorld(world: World) {
    // TODO: localStorageが満杯になった際の処理
    worldStorage.addWorld(world)
    this._worlds.push(world)
  }

  @Action({ commit: 'addWorld', rawError: true })
  async fetchWorld(id: string) {
    return memFetchWorld(id)
  }

  @Action({ commit: 'setWorlds' })
  async init() {
    const popularWorlds = await vrcApiService.fetchPopularWorlds()
    worldStorage.addWorlds(popularWorlds)

    return worldStorage.getWorlds()
  }
}
