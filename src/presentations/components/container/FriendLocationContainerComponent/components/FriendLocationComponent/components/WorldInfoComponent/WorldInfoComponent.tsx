import { Instance, World } from '../../../../../../../types'
import styles from './style.module.scss'
import { InstancePermissionComponent } from './components/InstancePermissionComponent/InstancePermissionComponent'
import classNames from 'classnames'
import { InstanceButtonComponent } from './components/InstanceButtonComponent/InstanceButtonComponent'
import { IconComponent } from '../../../../../../presentational/IconComponent/IconComponent'
import { useVisibilityManager } from '../../../../../../../hooks/useVisibilityManager'
import { JoinDialogComponent } from './components/JoinDialogComponent/JoinDialogComponent'
import { WatchDialogComponent } from './components/WatchDialogComponent/WatchDialogComponent'
import { useState } from 'react'
import { SpinnerComponent } from '../../../../../../presentational/SpinnerComponent/SpinnerComponent'
import { InstanceForFriendLocationComponent } from '../../../../FriendLocationContainerComponent'

type Props = {
  instance: InstanceForFriendLocationComponent
  world: World
  updateInstanceUserNum: (instance: Instance) => Promise<void>
  startWatch: (instanceId: string, notifyFreeSpaceNum: number) => void
  endWatch: (instanceId: string) => void
  inviteMe: (instance: Instance) => Promise<void>
}
export const WorldInfoComponent = ({
  world,
  instance,
  updateInstanceUserNum,
  startWatch,
  endWatch,
  inviteMe,
}: Props) => {
  const joinDialog = useVisibilityManager(false)
  const watchDialog = useVisibilityManager(false)

  const [isUpdatingInstanceUserNum, setIsUpdatingInstanceUserNum] = useState(
    false
  )

  const currentUserNumString = instance.userNum ?? '?'
  const isFull =
    instance.userNum !== undefined && instance.userNum >= world.hardCapacity
  const userNumClass = classNames(styles.userNum, {
    [styles.full]: isFull,
  })

  const watchStart = (notifyFreeSpaceNum: number) => {
    startWatch(instance.id, notifyFreeSpaceNum)
  }
  const watchEnd = () => {
    endWatch(instance.id)
  }

  const onClickUpdateUserNum = async () => {
    if (isUpdatingInstanceUserNum) return
    setIsUpdatingInstanceUserNum(true)
    await updateInstanceUserNum(instance).finally(() => {
      setIsUpdatingInstanceUserNum(false)
    })
  }

  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        className={styles.worldImage}
        src={world.thumbnailImageUrl}
        key={world.thumbnailImageUrl}
      />
      <div className={styles.tag}>
        <InstancePermissionComponent permission={instance.permission} />
      </div>
      <div className={userNumClass}>
        <span className={styles.current}>{currentUserNumString}/</span>
        <span className={styles.capacity}>{world.hardCapacity}</span>
      </div>
      <div className={styles.worldName}>{world.name}</div>
      <div className={styles.instanceButtonArea}>
        <div className={styles.instanceButtonGroup}>
          <div className={styles.instanceButtonGroupItem}>
            <InstanceButtonComponent onClick={joinDialog.show}>
              <span>JOIN</span>
            </InstanceButtonComponent>
          </div>

          <div className={styles.instanceButtonGroupItem}>
            <InstanceButtonComponent
              fontSize={14}
              onClick={onClickUpdateUserNum}
            >
              <span className={styles.instanceButtonText}>
                {isUpdatingInstanceUserNum ? (
                  <SpinnerComponent size={24} color="front" />
                ) : (
                  <span>
                    ユーザー数
                    <br />
                    更新
                  </span>
                )}
              </span>
            </InstanceButtonComponent>
          </div>

          <div
            className={classNames([
              styles.instanceButtonGroupItem,
              styles.watch,
            ])}
          >
            {instance.isWatching ? (
              <InstanceButtonComponent onClick={watchEnd}>
                <IconComponent size={20} color="green" icon="visibility" />
              </InstanceButtonComponent>
            ) : (
              <InstanceButtonComponent onClick={watchDialog.show}>
                <IconComponent size={20} color="front" icon="visibility" />
              </InstanceButtonComponent>
            )}
          </div>
        </div>
      </div>
      <JoinDialogComponent
        isVisible={joinDialog.isVisible}
        instance={instance}
        hide={joinDialog.hide}
        inviteMe={inviteMe}
      />
      <WatchDialogComponent
        isVisible={watchDialog.isVisible}
        onClickWatchStart={watchStart}
        hide={watchDialog.hide}
      />
    </div>
  )
}
