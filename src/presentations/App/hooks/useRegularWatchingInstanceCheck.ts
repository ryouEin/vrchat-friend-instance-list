import { useInterval } from 'react-use'
import { INSTANCE_WATCH_INTERVAL } from '../../../config/settings'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteWatchingInstance,
  selectWatchingInstances,
} from '../../store/WatchingInstances/WatchingInstancesStore'
import { IInstancesRepository } from '../../../repositories/Instances/IInstancesRepository'
import { addInstanceUserNum } from '../../store/InstanceUserNums/InstanceUserNumsStore'
import { Notification } from '../../types'
import { useAppRouting } from '../../hooks/useAppRouting'

export const useRegularWatchingInstanceCheck = (
  instancesRepository: IInstancesRepository,
  notify: (notification: Notification) => void
) => {
  const dispatch = useDispatch()
  const { toInstanceModal } = useAppRouting()
  const watchingInstances = useSelector(selectWatchingInstances)

  useInterval(async () => {
    const checkFreeSpace = async (
      instanceId: string,
      notifyFreeSpaceNum: number
    ) => {
      // TODO: ここらへん整理
      const apiResponse = await instancesRepository.fetchInstance(instanceId)
      dispatch(
        addInstanceUserNum({
          instanceId,
          userNum: apiResponse.n_users,
        })
      )
      const hardCapacity =
        apiResponse.capacity === 1 ? 1 : apiResponse.capacity * 2
      const freeSpaceNum = hardCapacity - apiResponse.n_users
      if (freeSpaceNum >= notifyFreeSpaceNum) {
        notify({
          text: 'インスタンスに空きが出来ました。',
          date: Date.now(),
          onClick: () => {
            toInstanceModal(instanceId)
          },
        })
        dispatch(deleteWatchingInstance(instanceId))
      }
    }

    await Promise.all(
      watchingInstances.map((watchingInstance) =>
        checkFreeSpace(
          watchingInstance.instanceId,
          watchingInstance.notifyFreeSpaceNum
        )
      )
    )
  }, INSTANCE_WATCH_INTERVAL)
}
