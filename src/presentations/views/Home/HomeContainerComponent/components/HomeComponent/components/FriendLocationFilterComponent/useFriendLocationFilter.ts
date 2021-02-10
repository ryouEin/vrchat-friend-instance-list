import { FriendLocation } from '../../../../../../../types'
import { useMemo, useState } from 'react'
import { Order, Orders } from './FriendLocationFilterComponent'

export const useFriendLocationFilter = (friendLocations: FriendLocation[]) => {
  const [showOnlyFavoriteFriends, setShowOnlyFavoriteFriends] = useState(false)
  const [order, setOrder] = useState<Order>(Orders.Default)

  const filteredFriendLocations = useMemo(() => {
    return friendLocations
      .filter((item) => {
        if (!showOnlyFavoriteFriends) return true

        return (
          item.friends.find((friend) => friend.favorite !== undefined) !==
          undefined
        )
      })
      .sort((a, b) => {
        const isPrivate = a.instance === undefined || b.instance === undefined
        if (order === Orders.Default || isPrivate) {
          return 0
        }

        if (order === Orders.FriendsDesc) {
          return b.friends.length - a.friends.length
        }

        return a.friends.length - b.friends.length
      })
  }, [friendLocations, showOnlyFavoriteFriends, order])

  return {
    filteredFriendLocations,
    showOnlyFavoriteFriends,
    order,
    onChangeFilter: (showOnlyFavoriteFriends: boolean) => {
      setShowOnlyFavoriteFriends(showOnlyFavoriteFriends)
    },
    onChangeOrder: (order: Order) => {
      setOrder(order)
    },
  }
}
