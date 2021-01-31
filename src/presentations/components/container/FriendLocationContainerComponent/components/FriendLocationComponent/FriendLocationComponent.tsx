import { FavoriteLimit, Friend, Instance } from '../../../../../types'
import styles from './style.module.scss'
import { UserListComponent } from './components/UserListComponent/UserListComponent'
import { InstanceDetailComponent } from './components/InstanceDetailComponent/InstanceDetailComponent'
import { FavoriteTag } from '../../../../../../types'
import { useMemo } from 'react'
import { UserListItemFriend } from './types'
import { InstanceForFriendLocationComponent } from '../../FriendLocationContainerComponent'

type Props = {
  instance?: InstanceForFriendLocationComponent
  friends: Friend[]
  updateInstanceUserNum: (instance: Instance) => Promise<void>
  fetchFavoriteLimits: () => Promise<FavoriteLimit[]>
  favoriteFriend: (friend: Friend, tag: FavoriteTag) => Promise<void>
  unfavoriteFriend: (friend: Friend) => Promise<void>
  startWatch: (instanceId: string, notifyFreeSpaceNum: number) => void
  endWatch: (instanceId: string) => void
  inviteMe: (instance: Instance) => Promise<void>
}
export const FriendLocationComponent = (props: Props) => {
  const friends = useMemo<UserListItemFriend[]>(() => {
    return props.friends.map((friend) => {
      const isOwner = (() => {
        if (props.instance === undefined) return false

        return props.instance.ownerId === friend.id
      })()

      return {
        ...friend,
        isOwner,
      }
    })
  }, [props.friends, props.instance])

  return (
    <div className={styles.root}>
      <div className={styles.instanceInfo}>
        <InstanceDetailComponent
          instance={props.instance}
          updateInstanceUserNum={props.updateInstanceUserNum}
          startWatch={props.startWatch}
          endWatch={props.endWatch}
          inviteMe={props.inviteMe}
        />
      </div>
      <div className={styles.userInfo}>
        <UserListComponent
          friends={friends}
          fetchFavoriteLimits={props.fetchFavoriteLimits}
          favoriteFriend={props.favoriteFriend}
          unfavoriteFriend={props.unfavoriteFriend}
        />
      </div>
    </div>
  )
}
