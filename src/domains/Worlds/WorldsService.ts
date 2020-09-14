import { ICacheWorldsRepository } from '@/infras/Worlds/ICacheWorldsRepository'
import { INetworkWorldsRepository } from '@/infras/Worlds/INetworkWorldsRepository'

export const getWorld = async (
  worldId: string,
  cacheWorldsRepository: ICacheWorldsRepository,
  networkWorldsRepository: INetworkWorldsRepository
) => {
  const worldsFromStorage = await cacheWorldsRepository.getWorlds()
  const worldFromStorage = worldsFromStorage.find(world => world.id === worldId)

  if (worldFromStorage !== undefined) return worldFromStorage

  const worldFromApi = await networkWorldsRepository.fetchWorld(worldId)
  await cacheWorldsRepository.addWorld(worldFromApi)

  return worldFromApi
}

export const calcWorldHardCapacity: (capacity: number) => number = capacity => {
  return capacity === 1 ? 1 : capacity * 2
}
