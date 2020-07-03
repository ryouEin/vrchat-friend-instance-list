import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { World } from '@/types/ApiResponse'
import * as vrcApiService from '@/infras/network/vrcApi'
import { worldStorageSingleton } from '@/shame/WorldStorage'
import pMemoize from 'p-memoize'

// TODO: memoizeした関数、ここにこういうふうに定義するので良いの？
const memFetchWorld = pMemoize(vrcApiService.fetchWorld, {
  maxAge: 10000,
})

// TODO: namespaced無しで大丈夫？
@Module({ name: 'worlds' })
export default class Worlds extends VuexModule {
  // TODO: UserではPresentation、こっちではApiResponse。統一性がないがいい？
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
    worldStorageSingleton.addWorld(world)
    this._worlds.push(world)
  }

  @Action({ commit: 'addWorld', rawError: true })
  async fetchWorld(id: string) {
    return memFetchWorld(id)
  }

  @Action({ commit: 'setWorlds' })
  async init() {
    const popularWorlds = await vrcApiService.fetchPopularWorlds()
    worldStorageSingleton.addWorlds(popularWorlds)

    return worldStorageSingleton.getWorlds()
  }
}
