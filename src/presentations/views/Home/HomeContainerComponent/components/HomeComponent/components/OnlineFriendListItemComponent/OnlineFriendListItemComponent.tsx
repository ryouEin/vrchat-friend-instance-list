import styles from './style.module.scss'
import { Friend } from '../../../../../../../types'
import { FavoriteMarkComponent } from '../../../../../../../components/presentational/FavoriteMarkComponent/FavoriteMarkComponent'
import classNames from 'classnames'

type Props = {
  friend: Friend
  onClickOnlineFriend: (friend: Friend) => void
}
export const OnlineFriendListItemComponent = (props: Props) => {
  const isFavorited = props.friend.favorite !== undefined
  const canJoinText = props.friend.canJoin ? 'can join' : 'private'

  const statusClass = classNames([
    styles.status,
    {
      [styles.canJoin]: props.friend.canJoin,
    },
  ])

  const onClick = () => {
    props.onClickOnlineFriend(props.friend)
  }

  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.figure}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className={styles.userImage}
          src={props.friend.currentAvatarThumbnailImageUrl}
          key={props.friend.currentAvatarThumbnailImageUrl}
        />
        {isFavorited ? (
          <div className={styles.favorite}>
            <FavoriteMarkComponent />
          </div>
        ) : null}
      </div>
      <div className={styles.userInfo}>
        <div className={styles.nameRow}>
          <div className={styles.nameCol}>
            {props.friend.isNew ? <div className={styles.new}>NEW</div> : null}
          </div>
          <div className={styles.displayName}>{props.friend.displayName}</div>
        </div>
        <div className={statusClass}>{canJoinText}</div>
      </div>
    </div>
  )
}
