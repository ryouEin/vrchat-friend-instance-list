import styles from './style.module.scss'
import { IconComponent } from '../IconComponent/IconComponent'
import { useVisibilityManager } from '../../../hooks/useVisibilityManager'
import { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

type Props = {
  scrollTop: number
  onClick: () => void
}
export const ToTopButtonComponent = (props: Props) => {
  const { isVisible, show, hide } = useVisibilityManager(false)

  useEffect(() => {
    if (props.scrollTop > 300) {
      show()
    } else {
      hide()
    }
  }, [props.scrollTop, show, hide])

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={isVisible}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      classNames="t-fadeDown"
    >
      <div className={styles.root} onClick={props.onClick}>
        <IconComponent size={14} icon="arrow_upward" />
        一番上へ戻る
      </div>
    </CSSTransition>
  )
}
