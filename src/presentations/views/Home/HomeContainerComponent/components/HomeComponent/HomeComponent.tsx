import { Friend, FriendLocation } from '../../../../../types'
import styles from './style.module.scss'
import { FABComponent } from '../../../../../components/presentational/FABComponent/FABComponent'
import { IconComponent } from '../../../../../components/presentational/IconComponent/IconComponent'
import { useVisibilityManager } from '../../../../../hooks/useVisibilityManager'
import classNames from 'classnames'
import { OnlineFriendListComponent } from './components/OnlineFriendListComponent/OnlineFriendListComponent'
import { FriendLocationAreaComponent } from './components/FriendLocationAreaComponent/FriendLocationAreaComponent'
import { UpdateFABComponent } from './components/UpdateFABComponent'

type Props = {
  friends: Friend[]
  friendLocations: FriendLocation[]
  update: () => Promise<void>
  onClickOnlineFriend: (friend: Friend) => void
  listItem: (friendLocation: FriendLocation) => JSX.Element
}
export const HomeComponent = (props: Props) => {
  const onlineFriends = useVisibilityManager(false)

  const onlineFriendsClass = classNames([
    styles.side,
    {
      [styles.visible]: onlineFriends.isVisible,
    },
  ])

  return (
    <div className={styles.root}>
      <div className={onlineFriendsClass}>
        <div className={styles.overlay} onClick={onlineFriends.hide} />
        <div className={styles.content}>
          <OnlineFriendListComponent
            friends={props.friends}
            onClickOnlineFriend={props.onClickOnlineFriend}
          />
        </div>
      </div>
      <div className={styles.main}>
        <FriendLocationAreaComponent
          friendLocations={props.friendLocations}
          listItem={(friendLocation) => props.listItem(friendLocation)}
        />
        <div className="u-spOnly">
          <FABComponent position="left" onClick={onlineFriends.show}>
            <IconComponent size={50} color="black" icon="people" />
          </FABComponent>
        </div>
        <UpdateFABComponent onClick={props.update} />
      </div>
    </div>
  )
}
