import { World } from '@/types/ApiResponse'

export interface IWorldStorage {
  getWorlds(): Promise<World[]>

  addWorld(world: World): Promise<void>

  addWorlds(worlds: World[]): Promise<void>
}
