import { FriendLocation } from '../../../../../../../types'
import { FriendLocationListComponent } from '../FriendLocationListComponent/FriendLocationListComponent'
import { FriendLocationFilterComponent } from '../FriendLocationFilterComponent/FriendLocationFilterComponent'
import { useFriendLocationFilter } from '../FriendLocationFilterComponent/useFriendLocationFilter'

type Props = {
  friendLocations: FriendLocation[]
  listItem: (friendLocation: FriendLocation) => JSX.Element
}
export const FriendLocationAreaComponent = (props: Props) => {
  const {
    filteredFriendLocations,
    showOnlyFavoriteFriends,
    order,
    onChangeFilter,
    onChangeOrder,
  } = useFriendLocationFilter(props.friendLocations)

  return (
    <FriendLocationListComponent
      beforeContent={
        <FriendLocationFilterComponent
          showOnlyFavoriteFriends={showOnlyFavoriteFriends}
          order={order}
          onChangeFilter={onChangeFilter}
          onChangeOrder={onChangeOrder}
        />
      }
      friendLocations={filteredFriendLocations}
      rowItem={(friendLocation) => props.listItem(friendLocation)}
      afterContent={<div style={{ height: '100px' }} />}
    />
  )
}
