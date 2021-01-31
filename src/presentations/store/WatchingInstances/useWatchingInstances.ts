import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchingInstance,
  deleteWatchingInstance,
  selectWatchingInstanceByInstanceId,
  selectWatchingInstances,
} from './WatchingInstancesStore'

export const useWatchingInstances = () => {
  const dispatch = useDispatch()
  const watchingInstances = useSelector(selectWatchingInstances)
  const watchingInstanceByInstanceId = useSelector(
    selectWatchingInstanceByInstanceId
  )

  return {
    watchingInstances,
    watchingInstanceByInstanceId,
    startWatch: (instanceId: string, notifyFreeSpaceNum: number) => {
      dispatch(addWatchingInstance({ instanceId, notifyFreeSpaceNum }))
    },
    endWatch: (instanceId: string) => {
      dispatch(deleteWatchingInstance(instanceId))
    },
  }
}
