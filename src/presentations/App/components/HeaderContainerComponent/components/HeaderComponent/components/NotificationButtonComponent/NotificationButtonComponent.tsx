import { Notification } from '../../../../../../../types'
import styles from './style.module.scss'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { useVisibilityManager } from '../../../../../../../hooks/useVisibilityManager'
import { IconComponent } from '../../../../../../../components/presentational/IconComponent/IconComponent'
import { NotificationItemComponent } from './components/NotificationItemComponent/NotificationItemComponent'
import { useWatchValue } from '../../../../../../../hooks/useWatchValue'
import { useClickAway } from 'react-use'

type Props = {
  notifications: Notification[]
}
export const NotificationButtonComponent = (props: Props) => {
  const menu = useVisibilityManager(false)
  const [hasUnreadNotification, setHasUnreadNotification] = useState(false)

  const ref = useRef(null)
  useClickAway(ref, menu.hide)

  useWatchValue(props.notifications.length, (newValue, oldValue) => {
    if (oldValue === undefined) return
    if (newValue > oldValue) {
      setHasUnreadNotification(true)
    }
  })

  const showMenu = () => {
    setHasUnreadNotification(false)

    menu.show()
  }

  return (
    <div className={styles.root} ref={ref}>
      <div className={styles.button} onClick={showMenu}>
        <IconComponent size={24} color="white" icon="notifications" />
        <span className={classNames([styles.text, 'u-pcOnly'])}>通知一覧</span>
        {hasUnreadNotification ? <div className={styles.badge} /> : null}
      </div>
      {menu.isVisible ? (
        <div className={styles.menu}>
          {props.notifications.length > 0 ? (
            props.notifications.map((notification) => (
              <div className={styles.items}>
                <NotificationItemComponent notification={notification} />
              </div>
            ))
          ) : (
            <div className={styles.items}>
              <div
                className={classNames([
                  styles.item,
                  'u-alignCenter',
                  'u-pt15',
                  'u-pb15',
                ])}
              >
                通知はありません
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
