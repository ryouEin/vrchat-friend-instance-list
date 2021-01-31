import { WorldApiResponse } from '../../../types/ApiResponse'

export interface IWorldsCache {
  getWorlds(): Promise<WorldApiResponse[]>

  addWorld(world: WorldApiResponse): Promise<void>

  addWorlds(worlds: WorldApiResponse[]): Promise<void>
}
