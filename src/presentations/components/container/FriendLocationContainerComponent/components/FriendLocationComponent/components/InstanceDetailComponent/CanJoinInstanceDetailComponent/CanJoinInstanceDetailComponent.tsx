import { useEffect } from 'react'
import { Instance } from '../../../../../../../../types'
import { worldsRepository } from '../../../../../../../../../factory/repository'
import styles from './style.module.scss'
import { SpinnerComponent } from '../../../../../../../presentational/SpinnerComponent/SpinnerComponent'
import { WorldInfoComponent } from '../../WorldInfoComponent/WorldInfoComponent'
import { InstanceForFriendLocationComponent } from '../../../../../FriendLocationContainerComponent'
import { useAsyncFn } from 'react-use'

type Props = {
  instance: InstanceForFriendLocationComponent
  updateInstanceUserNum: (instance: Instance) => Promise<void>
  startWatch: (instanceId: string, notifyFreeSpaceNum: number) => void
  endWatch: (instanceId: string) => void
  inviteMe: (instance: Instance) => Promise<void>
}
export const CanJoinInstanceDetailComponent = (props: Props) => {
  const [fetchWorldState, fetchWorld] = useAsyncFn(
    () => worldsRepository.fetchWorld(props.instance.worldId),
    [props.instance.worldId]
  )

  useEffect(() => {
    ;(async () => {
      await fetchWorld()
    })()
  }, [fetchWorld])

  return (
    <>
      {fetchWorldState.loading ? (
        <div className={styles.loading}>
          <SpinnerComponent color="white" />
        </div>
      ) : fetchWorldState.error || fetchWorldState.value === undefined ? (
        <div className={styles.error}>Error</div>
      ) : (
        <WorldInfoComponent
          world={fetchWorldState.value}
          instance={props.instance}
          updateInstanceUserNum={props.updateInstanceUserNum}
          startWatch={props.startWatch}
          endWatch={props.endWatch}
          inviteMe={props.inviteMe}
        />
      )}
    </>
  )
}
