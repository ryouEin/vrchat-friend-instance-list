import { FavoriteLimit, Friend } from '../../../../../../../types'
import styles from './style.module.scss'
import { UserListItemComponent } from '../UserListItemComponent/UserListItemComponent'
import { FavoriteTag } from '../../../../../../../../types'
import { UserListItemFriend } from '../../types'

type Props = {
  friends: UserListItemFriend[]
  fetchFavoriteLimits: () => Promise<FavoriteLimit[]>
  favoriteFriend: (friend: Friend, tag: FavoriteTag) => Promise<void>
  unfavoriteFriend: (friend: Friend) => Promise<void>
}
export const UserListComponent = (props: Props) => {
  return (
    <div className={styles.root}>
      {props.friends.map((friend) => (
        <div className={styles.item} key={friend.id}>
          <UserListItemComponent
            friend={friend}
            fetchFavoriteLimits={props.fetchFavoriteLimits}
            favoriteFriend={props.favoriteFriend}
            unfavoriteFriend={props.unfavoriteFriend}
          />
        </div>
      ))}
    </div>
  )
}
