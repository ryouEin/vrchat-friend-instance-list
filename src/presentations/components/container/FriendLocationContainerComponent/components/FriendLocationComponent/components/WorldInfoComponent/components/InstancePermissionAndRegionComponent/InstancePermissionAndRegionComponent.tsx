import styles from './style.module.scss'
import {
  InstancePermission,
  InstancePermissions,
  Region,
} from '../../../../../../../../../../types'
import classNames from 'classnames'

type Props = {
  permission: InstancePermission
  region?: Region
}
export const InstancePermissionAndRegionComponent = ({
  permission,
  region,
}: Props) => {
  const permissionClass = classNames([
    styles.permission,
    {
      [styles.public]: permission === InstancePermissions.Public,
      [styles.friends]: permission === InstancePermissions.Friends,
      [styles.friendPlus]: permission === InstancePermissions.FriendPlus,
    },
  ])
  return (
    <div className={styles.root}>
      <div className={permissionClass}>{permission}</div>
      {region !== undefined ? (
        <div className={styles.region}>{region.toUpperCase()}</div>
      ) : null}
    </div>
  )
}
