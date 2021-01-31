import { Friend, FriendLocation } from '../../../../../types'
import styles from './style.module.scss'
import { FABComponent } from '../../../../../components/presentational/FABComponent/FABComponent'
import { IconComponent } from '../../../../../components/presentational/IconComponent/IconComponent'
import { useState } from 'react'
import { SpinnerComponent } from '../../../../../components/presentational/SpinnerComponent/SpinnerComponent'
import { useVisibilityManager } from '../../../../../hooks/useVisibilityManager'
import classNames from 'classnames'
import { OnlineFriendListComponent } from './components/OnlineFriendListComponent/OnlineFriendListComponent'
import { FriendLocationAreaComponent } from './components/FriendLocationAreaComponent/FriendLocationAreaComponent'

type Props = {
  friends: Friend[]
  friendLocations: FriendLocation[]
  update: () => Promise<void>
  onClickOnlineFriend: (friend: Friend) => void
  listItem: (friendLocation: FriendLocation) => JSX.Element
}
export const HomeComponent = (props: Props) => {
  const onlineFriends = useVisibilityManager(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const update = async () => {
    if (isUpdating) return

    setIsUpdating(true)
    await props.update().finally(() => {
      setIsUpdating(false)
    })
  }

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
        <FABComponent color="main" onClick={update}>
          {isUpdating ? (
            <SpinnerComponent color="white" />
          ) : (
            <IconComponent size={50} color="white" icon="refresh" />
          )}
        </FABComponent>
      </div>
    </div>
  )
}
