import { FavoriteLimit, Friend, FriendLocation, Instance } from '../../../types'
import { useInstanceUserNums } from '../../../store/InstanceUserNums/useInstanceUserNums'
import { instancesRepository } from '../../../../factory/repository'
import { useWatchingInstances } from '../../../store/WatchingInstances/useWatchingInstances'
import { FriendLocationComponent } from './components/FriendLocationComponent/FriendLocationComponent'
import { FavoriteTag } from '../../../../types'
import { useMemo } from 'react'
import { vrchatApi } from '../../../../factory/vrchatApi'

export type InstanceForFriendLocationComponent = Instance & {
  userNum?: number
  isWatching: boolean
}

type Props = {
  friendLocation: FriendLocation
  fetchFavoriteLimits: () => Promise<FavoriteLimit[]>
  favoriteFriend: (friend: Friend, tag: FavoriteTag) => Promise<void>
  unfavoriteFriend: (friend: Friend) => Promise<void>
}
export const FriendLocationContainerComponent = (props: Props) => {
  const {
    instanceUserNumByInstanceId,
    updateInstanceUserNum,
  } = useInstanceUserNums(instancesRepository)
  const {
    watchingInstanceByInstanceId,
    startWatch,
    endWatch,
  } = useWatchingInstances()

  const instance:
    | InstanceForFriendLocationComponent
    | undefined = useMemo(() => {
    const tmpInstance = props.friendLocation.instance
    if (tmpInstance === undefined) return undefined

    const instanceUserNum = instanceUserNumByInstanceId(tmpInstance.id)
    return {
      ...tmpInstance,
      userNum: instanceUserNum?.userNum,
      isWatching: watchingInstanceByInstanceId(tmpInstance.id) !== undefined,
    }
  }, [
    props.friendLocation.instance,
    watchingInstanceByInstanceId,
    instanceUserNumByInstanceId,
  ])

  const inviteMe = async (instance: Instance) => {
    await vrchatApi.inviteMe({ location: instance.id })
  }

  return (
    <FriendLocationComponent
      instance={instance}
      friends={props.friendLocation.friends}
      updateInstanceUserNum={updateInstanceUserNum}
      startWatch={startWatch}
      endWatch={endWatch}
      inviteMe={inviteMe}
      fetchFavoriteLimits={props.fetchFavoriteLimits}
      favoriteFriend={props.favoriteFriend}
      unfavoriteFriend={props.unfavoriteFriend}
    />
  )
}
