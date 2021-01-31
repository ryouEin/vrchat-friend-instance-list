import styles from './style.module.scss'
import { IconComponent } from '../../../components/presentational/IconComponent/IconComponent'
import { SettingDialogComponent } from './components/SettingDialogComponent/SettingDialogComponent'
import { AboutCapacityDialogComponent } from './components/AboutCapacityDialogComponent/AboutCapacityDialogComponent'
import { AuthorDialogComponent } from './components/AuthorDialogComponent/AuthorDialogComponent'
import React from 'react'
import { useVisibilityManager } from '../../../hooks/useVisibilityManager'
import { Setting } from '../../../types'
import { CSSTransition } from 'react-transition-group'

type Props = {
  isVisible: boolean
  hide: () => void
  setting: Setting
  onChangeSetting: (setting: Setting) => void
}
export const MenuComponent = (props: Props) => {
  const settingDialog = useVisibilityManager(false)
  const aboutCapacityDialog = useVisibilityManager(false)
  const authorDialog = useVisibilityManager(false)

  const hideMenu = () => {
    props.hide()
  }

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.isVisible}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      classNames={{
        enter: styles.animationEnter,
        enterActive: styles.animationEnterActive,
        exit: styles.animationExit,
        exitActive: styles.animationExitActive,
      }}
    >
      <div className={styles.root}>
        <div className={styles.overlay} onClick={hideMenu} />
        <div className={styles.list}>
          <div className={styles.item} onClick={settingDialog.show}>
            <IconComponent color="front" size={24} icon="settings" />
            <div className={styles.text}>設定</div>
          </div>
          <div className={styles.item} onClick={aboutCapacityDialog.show}>
            <IconComponent color="front" size={24} icon="help" />
            <div className={styles.text}>インスタンスの最大人数に関して</div>
          </div>
          <div className={styles.item} onClick={authorDialog.show}>
            <IconComponent color="front" size={24} icon="account_circle" />
            <div className={styles.text}>製作者</div>
          </div>
        </div>
        <div>
          <SettingDialogComponent
            isVisible={settingDialog.isVisible}
            setting={props.setting}
            onChangeSetting={props.onChangeSetting}
            hide={settingDialog.hide}
          />
          <AboutCapacityDialogComponent
            isVisible={aboutCapacityDialog.isVisible}
            hide={aboutCapacityDialog.hide}
          />
          <AuthorDialogComponent
            isVisible={authorDialog.isVisible}
            hide={authorDialog.hide}
          />
        </div>
      </div>
    </CSSTransition>
  )
}
