import styles from './style.module.scss'
import { NotificationButtonComponent } from './components/NotificationButtonComponent/NotificationButtonComponent'
import { IconComponent } from '../../../../../components/presentational/IconComponent/IconComponent'
import React from 'react'
import { Notification } from '../../../../../types'

type Props = {
  notifications: Notification[]
  onClickMenu: () => void
}
export const HeaderComponent = (props: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.appTitle}>VRC Friend Instance List</div>
      <div className={styles.spacer} />
      <NotificationButtonComponent notifications={props.notifications} />
      <div className={styles.iconButton} onClick={props.onClickMenu}>
        <IconComponent size={24} color="white" icon="menu" />
      </div>
    </div>
  )
}
