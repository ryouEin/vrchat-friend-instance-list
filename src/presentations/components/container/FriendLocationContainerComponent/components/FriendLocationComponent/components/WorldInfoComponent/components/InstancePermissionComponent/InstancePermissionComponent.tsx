import styles from './style.module.scss'
import {
  InstancePermission,
  InstancePermissions,
} from '../../../../../../../../../../types'
import classNames from 'classnames'

type Props = {
  permission: InstancePermission
}
export const InstancePermissionComponent = ({ permission }: Props) => {
  const rootClass = classNames([
    styles.permission,
    {
      [styles.public]: permission === InstancePermissions.Public,
      [styles.friends]: permission === InstancePermissions.Friends,
      [styles.friendPlus]: permission === InstancePermissions.FriendPlus,
    },
  ])
  return <div className={rootClass}>{permission}</div>
}
