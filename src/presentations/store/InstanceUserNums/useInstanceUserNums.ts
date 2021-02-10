import { IInstancesRepository } from '../../../repositories/Instances/IInstancesRepository'
import { useDispatch, useSelector } from 'react-redux'
import {
  addInstanceUserNum,
  selectInstanceUserNumByInstanceId,
  selectInstanceUserNums,
} from './InstanceUserNumsStore'
import { Instance } from '../../types'
import { useCallback, useMemo } from 'react'

export const useInstanceUserNums = (
  instanceRepository: IInstancesRepository
) => {
  const dispatch = useDispatch()
  const instanceUserNums = useSelector(selectInstanceUserNums)
  const instanceUserNumByInstanceId = useSelector(
    selectInstanceUserNumByInstanceId
  )

  const updateInstanceUserNum = useCallback(
    async (instance: Instance) => {
      const response = await instanceRepository.fetchInstance(instance.id)
      dispatch(
        addInstanceUserNum({
          instanceId: response.location,
          userNum: response.n_users,
        })
      )
    },
    [dispatch, instanceRepository]
  )

  return useMemo(
    () => ({
      instanceUserNums,
      instanceUserNumByInstanceId,
      updateInstanceUserNum,
    }),
    [instanceUserNums, instanceUserNumByInstanceId, updateInstanceUserNum]
  )
}
