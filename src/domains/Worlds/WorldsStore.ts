import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'
import { ICacheWorldsRepository } from '@/infras/Worlds/ICacheWorldsRepository'
import { World } from '@/types'
import { calcWorldHardCapacity, getWorld } from '@/domains/Worlds/WorldsService'
import * as ApiResponse from '@/types/ApiResponse'
import { computed, ComputedRef, reactive } from '@vue/composition-api'

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
  world: ComputedRef<(id: string) => World | undefined>
}

type State = {
  worlds: World[]
}
export const createWorldsStore = (
  networkWorldsRepository: INetworkWorldsRepository,
  cacheWorldsRepository: ICacheWorldsRepository
) => {
  const state = reactive<State>({
    worlds: [],
  })

  const worlds = computed(() => {
    return state.worlds
  })

  const world = computed(() => {
    return (id: string) => {
      return state.worlds.find(world => world.id === id)
    }
  })

  const setWorldsMutation = (worlds: ApiResponse.WorldApiResponse[]) => {
    state.worlds = worlds.map(world => makeWorldFromApiResponse(world))
  }

  const addWorldMutation = (world: ApiResponse.WorldApiResponse) => {
    state.worlds.push(makeWorldFromApiResponse(world))
  }

  const fetchWorldAction = async (id: string) => {
    const world = await getWorld(
      id,
      cacheWorldsRepository,
      networkWorldsRepository
    )

    addWorldMutation(world)
  }

  const initAction = async () => {
    const popularWorlds = await networkWorldsRepository.fetchPopularWorlds()
    await cacheWorldsRepository.addWorlds(popularWorlds)

    const worlds = await cacheWorldsRepository.getWorlds()

    setWorldsMutation(worlds)
  }

  return {
    worlds,
    world,
    fetchWorldAction,
    initAction,
  }
}
