import { useMemo, useState } from 'react'
import { FriendLocation as RepositoryFriendLocation } from '../../../../../repositories/FriendLocations/IFriendLocationsRepository'
import { Favorite, Friend, FriendLocation } from '../../../../types'
import { friendLocationsRepository } from '../../../../../factory/repository'
import { sortUsers } from '../../../../../shame/sortUsers'

const makeFriendsFromRepository = (
  friendLocation: RepositoryFriendLocation,
  favorites: Favorite[],
  oldUserIds: string[]
) => {
  return sortUsers(
    friendLocation.friends.map((friend) => {
      const favorite = favorites.find(
        (favorite) => favorite.favoriteId === friend.id
      )
      return {
        ...friend,
        favorite,
        isNew: oldUserIds.length <= 0 ? false : !oldUserIds.includes(friend.id),
      }
    })
  )
}

const convertFriendLocationsFromRepositoryData = (
  friendLocationsFromRepository: RepositoryFriendLocation[],
  favorites: Favorite[],
  oldUserIds: string[]
) => {
  return friendLocationsFromRepository.map((friendLocation) => {
    const instance = friendLocation.instance
    return {
      id: friendLocation.id,
      instance,
      friends: makeFriendsFromRepository(friendLocation, favorites, oldUserIds),
    }
  })
}

const extractFriendIdsFromFriendLocations = (
  friendLocations: FriendLocation[]
) => {
  return friendLocations.reduce<string[]>((previous, current) => {
    const friendIdsInInstance = current.friends.map((friend) => friend.id)
    return previous.concat(friendIdsInInstance)
  }, [])
}

const extractFriendsFromFriendLocations = (
  friendLocations: FriendLocation[]
) => {
  return friendLocations.reduce<Friend[]>((ac, current) => {
    return ac.concat(current.friends)
  }, [])
}

export const useFriendLocations = (favorites: Favorite[]) => {
  const [
    friendLocationsFromRepository,
    setFriendLocationsFromRepository,
  ] = useState<RepositoryFriendLocation[]>([])
  const [oldUserIds, setOldUserIds] = useState<string[]>([])

  // TODO: ちょっとした所が変化するだけで全体を計算し直すのどうにかならんか？
  const friendLocations = useMemo<FriendLocation[]>(() => {
    return convertFriendLocationsFromRepositoryData(
      friendLocationsFromRepository,
      favorites,
      oldUserIds
    )
  }, [friendLocationsFromRepository, oldUserIds, favorites])

  const friends = useMemo(() => {
    return sortUsers(extractFriendsFromFriendLocations(friendLocations))
  }, [friendLocations])

  const update = async () => {
    const [newFriendLocations] = await Promise.all([
      friendLocationsRepository.fetchFriendLocations(),
    ])
    setOldUserIds(extractFriendIdsFromFriendLocations(friendLocations))
    setFriendLocationsFromRepository(newFriendLocations)
  }

  return {
    friends,
    friendLocations,
    update,
  }
}
