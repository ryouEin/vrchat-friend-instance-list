import { World } from '@/types'
import * as ApiResponse from '@/types/ApiResponse'
import * as vrcApiService from '@/infras/network/vrcApi'
import { WorldStorage } from '@/infras/storage/World/WorldStorage'
import Storage from '@/libs/Storage/Storage'
import { memoizedFetchWorld } from '@/infras/network/vrcApi'
import { calcWorldHardCapacity } from '@/shame/calcWorldHardCapacity'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { IWorldStorage } from '@/infras/storage/World/IWorldStorage'

const makeWorldFromApiResponse: (world: ApiResponse.World) => World = world => {
  return {
    ...world,
    hardCapacity: calcWorldHardCapacity(world.capacity),
  }
}

type State = {
  worlds: World[]
}
@MakeReferenceToWindowObjectInDevelopment('worldsStore')
export class WorldsStore {
  private _state = Vue.observable<State>({
    worlds: [],
  })

  constructor(private readonly _worldStorage: IWorldStorage) {}

  get worlds() {
    return this._state.worlds
  }

  get world() {
    return (id: string) => {
      return this.worlds.find(world => world.id === id)
    }
  }

  @LogBeforeAfter('_state')
  private setWorldsMutation(worlds: ApiResponse.World[]) {
    this._state.worlds = worlds.map(world => makeWorldFromApiResponse(world))
  }

  @LogBeforeAfter('_state')
  private addWorldMutation(world: ApiResponse.World) {
    this._state.worlds.push(makeWorldFromApiResponse(world))
  }

  async fetchWorldAction(id: string) {
    const world = await memoizedFetchWorld(id)

    // TODO: localStorageが満杯になった際の処理
    await this._worldStorage.addWorld(world)

    this.addWorldMutation(world)
  }

  async initAction() {
    // TODO SOON: APIに関して中小に依存するようにする
    const popularWorlds = await vrcApiService.fetchPopularWorlds()

    await this._worldStorage.addWorlds(popularWorlds)
    const worlds = await this._worldStorage.getWorlds()

    this.setWorldsMutation(worlds)
  }
}

const worldStorage = new WorldStorage(new Storage())
const worldsStore = new WorldsStore(worldStorage)

export default worldsStore
