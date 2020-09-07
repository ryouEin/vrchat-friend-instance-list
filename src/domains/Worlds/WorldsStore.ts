import { World } from '@/types'
import * as ApiResponse from '@/types/ApiResponse'
import Vue from 'vue'
import {
  LogBeforeAfter,
  MakeReferenceToWindowObjectInDevelopment,
} from '@/libs/Decorators'
import { calcWorldHardCapacity, getWorld } from '@/domains/Worlds/WorldsService'
import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'
import { ICacheWorldsRepository } from '@/infras/Worlds/ICacheWorldsRepository'

const makeWorldFromApiResponse: (
  world: ApiResponse.WorldApiResponse
) => World = world => {
  return {
    ...world,
    hardCapacity: calcWorldHardCapacity(world.capacity),
  }
}

// TODO:
//  以下の内容に関して、再考
//  「前提」
//  ・InstancesStoreは「get world()」に依存している
//  ・なので、InstancesStoreのテストでインジェクションする必要があった
//  ・ただ、WorldsStore全体をinterface定義するのは大仰に感じた
//  ・なので、「get world()」のみを切り出してinterface化した
//  「再考するべき点」
//  ・前述の「get world()」のみinterface化した行為は正しいのか
//  ・正しいとして、こんなinterfaceの命名でいいのか
export interface ICanGetWorldById {
  world: (id: string) => World | undefined
}

type State = {
  worlds: World[]
}
@MakeReferenceToWindowObjectInDevelopment('worldsStore')
export class WorldsStore implements ICanGetWorldById {
  private _state = Vue.observable<State>({
    worlds: [],
  })

  constructor(
    private readonly _networkWorldsRepository: INetworkWorldsRepository,
    private readonly _cacheWorldsRepository: ICacheWorldsRepository
  ) {}

  get worlds() {
    return this._state.worlds
  }

  get world() {
    return (id: string) => {
      return this.worlds.find(world => world.id === id)
    }
  }

  @LogBeforeAfter('_state')
  private setWorldsMutation(worlds: ApiResponse.WorldApiResponse[]) {
    this._state.worlds = worlds.map(world => makeWorldFromApiResponse(world))
  }

  @LogBeforeAfter('_state')
  private addWorldMutation(world: ApiResponse.WorldApiResponse) {
    this._state.worlds.push(makeWorldFromApiResponse(world))
  }

  async fetchWorldAction(id: string) {
    const world = await getWorld(
      id,
      this._cacheWorldsRepository,
      this._networkWorldsRepository
    )

    this.addWorldMutation(world)
  }

  async initAction() {
    const popularWorlds = await this._networkWorldsRepository.fetchPopularWorlds()
    await this._cacheWorldsRepository.addWorlds(popularWorlds)

    const worlds = await this._cacheWorldsRepository.getWorlds()

    this.setWorldsMutation(worlds)
  }
}
