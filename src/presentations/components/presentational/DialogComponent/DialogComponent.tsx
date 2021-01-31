import ReactDOM from 'react-dom'
import styles from './style.module.scss'
import { useMemo } from 'react'
import { CSSTransition } from 'react-transition-group'

type Props = {
  isVisible: boolean
  title: string
  contentSlot?: JSX.Element
  buttons: JSX.Element[]
}
export const DialogComponent = (props: Props) => {
  const appElement = useMemo(() => document.getElementById('app'), [])
  if (appElement === null) {
    throw new Error('ID#appのDOMが見つかりません')
  }

  return ReactDOM.createPortal(
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.isVisible}
      addEndListener={(node, done) => {
        node.addEventListener('transitionend', done, false)
      }}
      classNames="t-fade"
    >
      <div className={styles.root}>
        <div className={styles.overlay} />
        <div className={styles.body}>
          {props.title.length > 0 ? (
            <div className={styles.header}>{props.title}</div>
          ) : null}
          <div className={styles.content}>
            {props.contentSlot !== undefined ? props.contentSlot : null}
          </div>
          <div className={styles.buttonArea}>
            {props.buttons.map((button) => (
              <div className={styles.button}>{button}</div>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>,
    appElement
  )
}
