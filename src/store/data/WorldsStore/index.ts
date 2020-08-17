import { World } from '@/types'
import * as ApiResponse from '@/types/ApiResponse'
import { calcWorldHardCapacity } from '@/shame/calcWorldHardCapacity'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { IWorldsRepository } from '@/infras/Worlds/IWorldsRepository'

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

  constructor(private readonly _worldRepository: IWorldsRepository) {}

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
    const world = await this._worldRepository.getWorld(id)

    this.addWorldMutation(world)
  }

  async initAction() {
    await this._worldRepository.updateCacheByPopularWorlds()
    const worlds = await this._worldRepository.getWorldsFromCache()

    this.setWorldsMutation(worlds)
  }
}
