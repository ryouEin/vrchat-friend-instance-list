import { computed, ComputedRef, reactive } from '@vue/composition-api'
import { UserApiResponse } from '@/types/ApiResponse'
import { Friend, InstanceLocation } from '@/types'
import { ICanGetFavoriteByUserId } from '@/domains/Favorites/FavoritesStore'
import { IFriendsRepository } from '@/infras/Friends/IFriendsRepository'
import { markNewFriends } from '@/domains/Friends/FriendsService'

// TODO: 命名に関して再考。流石にFriendWithNewはやばそう
export type FriendWithNew = UserApiResponse & { isNew: boolean }

export interface IFriendsStore {
  friends: ComputedRef<Friend[]>
  friendsByLocation: ComputedRef<(location: InstanceLocation) => Friend[]>
  fetchFriendsAction(): Promise<void>
}
type State = {
  friends: FriendWithNew[]
}
export const createFriendsStore: (
  friendsRepository: IFriendsRepository,
  favoritesStore: ICanGetFavoriteByUserId
) => IFriendsStore = (friendsRepository, favoritesStore) => {
  const state = reactive<State>({
    friends: [],
  })

  const friends = computed<Friend[]>(() => {
    return state.friends.map(friend => {
      const favorite = favoritesStore.favoriteByUserId(friend.id)

      return {
        ...friend,
        favorite,
      }
    })
  })

  const friendsByLocation = computed<(location: InstanceLocation) => Friend[]>(
    () => {
      return (location: InstanceLocation) => {
        return friends.value.filter(friend => friend.location === location)
      }
    }
  )

  const setFriendsMutation = (friends: Friend[]) => {
    state.friends = friends
  }

  const fetchFriendsAction = async () => {
    const newFriends = await friendsRepository.fetchAllFriends()

    setFriendsMutation(markNewFriends(friends.value, newFriends))
  }

  return {
    friends,
    friendsByLocation,
    fetchFriendsAction,
  }
}
