import styles from './style.module.scss'
import { Notification } from '../../../../../../../../../types'
import { useMemo } from 'react'
import classNames from 'classnames'

type Props = {
  notification: Notification
}
export const NotificationItemComponent = (props: Props) => {
  const dateString = useMemo(() => {
    return new Date(props.notification.date).toLocaleString()
  }, [props.notification.date])

  const rootClass = classNames([styles.root, styles.interactive])

  return (
    <div className={rootClass} onClick={props.notification.onClick}>
      <div className={styles.content}>{props.notification.text}</div>
      <div className={styles.time}>{dateString}</div>
    </div>
  )
}
