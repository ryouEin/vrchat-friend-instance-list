import { FavoriteLimit, Friend, FriendLocation, Instance } from '../../../types'
import { useInstanceUserNums } from '../../../store/InstanceUserNums/useInstanceUserNums'
import { instancesRepository } from '../../../../factory/repository'
import { useWatchingInstances } from '../../../store/WatchingInstances/useWatchingInstances'
import { FriendLocationComponent } from './components/FriendLocationComponent/FriendLocationComponent'
import { FavoriteTag } from '../../../../types'
import { useCallback, useMemo } from 'react'
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

  const instanceId = useMemo(() => {
    const tmpInstance = props.friendLocation.instance
    if (tmpInstance === undefined) return undefined

    return tmpInstance.id
  }, [props.friendLocation.instance])

  const instanceUserNum = useMemo(() => {
    if (instanceId === undefined) return undefined

    return instanceUserNumByInstanceId(instanceId)
  }, [instanceId, instanceUserNumByInstanceId])

  const isWatching = useMemo(() => {
    if (instanceId === undefined) return false

    return watchingInstanceByInstanceId(instanceId) !== undefined
  }, [instanceId, watchingInstanceByInstanceId])

  const instance:
    | InstanceForFriendLocationComponent
    | undefined = useMemo(() => {
    const tmpInstance = props.friendLocation.instance
    if (tmpInstance === undefined) return undefined

    return {
      ...tmpInstance,
      userNum: instanceUserNum?.userNum,
      isWatching,
    }
  }, [props.friendLocation.instance, isWatching, instanceUserNum])

  const inviteMe = useCallback(async (instance: Instance) => {
    await vrchatApi.inviteMe({ location: instance.id })
  }, [])

  return useMemo(
    () => (
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
    ),
    [
      instance,
      props.friendLocation.friends,
      updateInstanceUserNum,
      startWatch,
      endWatch,
      inviteMe,
      props.fetchFavoriteLimits,
      props.favoriteFriend,
      props.unfavoriteFriend,
    ]
  )
}
