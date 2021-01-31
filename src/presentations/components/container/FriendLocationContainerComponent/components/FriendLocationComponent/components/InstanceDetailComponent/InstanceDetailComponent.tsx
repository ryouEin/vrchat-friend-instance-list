import styles from './style.module.scss'
import { Instance } from '../../../../../../../types'
import classNames from 'classnames'
import { CanJoinInstanceDetailComponent } from './CanJoinInstanceDetailComponent/CanJoinInstanceDetailComponent'
import { InstanceForFriendLocationComponent } from '../../../../FriendLocationContainerComponent'

type Props = {
  instance?: InstanceForFriendLocationComponent
  updateInstanceUserNum: (instance: Instance) => Promise<void>
  startWatch: (instanceId: string, notifyFreeSpaceNum: number) => void
  endWatch: (instanceId: string) => void
  inviteMe: (instance: Instance) => Promise<void>
}
export const InstanceDetailComponent = (props: Props) => {
  return (
    <div className={styles.root}>
      {props.instance !== undefined ? (
        <div className={styles.inner}>
          <CanJoinInstanceDetailComponent
            instance={props.instance}
            updateInstanceUserNum={props.updateInstanceUserNum}
            startWatch={props.startWatch}
            endWatch={props.endWatch}
            inviteMe={props.inviteMe}
          />
        </div>
      ) : (
        <div className={classNames([styles.inner, styles.private])}>
          <div className={styles.textOnlyTitle}>Private</div>
        </div>
      )}
    </div>
  )
}
