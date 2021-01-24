import { World } from '@/types'

export interface IWorldsRepository {
  fetchWorld(worldId: string): Promise<World>
}
