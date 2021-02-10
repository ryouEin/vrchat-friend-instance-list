import { useDispatch, useSelector } from 'react-redux'
import {
  addWatchingInstance,
  deleteWatchingInstance,
  selectWatchingInstanceByInstanceId,
  selectWatchingInstances,
} from './WatchingInstancesStore'
import { useCallback, useMemo } from 'react'

export const useWatchingInstances = () => {
  const dispatch = useDispatch()
  const watchingInstances = useSelector(selectWatchingInstances)
  const watchingInstanceByInstanceId = useSelector(
    selectWatchingInstanceByInstanceId
  )

  const startWatch = useCallback(
    (instanceId: string, notifyFreeSpaceNum: number) => {
      dispatch(addWatchingInstance({ instanceId, notifyFreeSpaceNum }))
    },
    [dispatch]
  )

  const endWatch = useCallback(
    (instanceId: string) => {
      dispatch(deleteWatchingInstance(instanceId))
    },
    [dispatch]
  )

  return useMemo(
    () => ({
      watchingInstances,
      watchingInstanceByInstanceId,
      startWatch,
      endWatch,
    }),
    [watchingInstances, watchingInstanceByInstanceId, startWatch, endWatch]
  )
}
