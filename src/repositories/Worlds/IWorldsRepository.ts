import { World } from '../../presentations/types'

export interface IWorldsRepository {
  fetchWorld(worldId: string): Promise<World>
}
