import styles from './style.module.scss'
import { ToastComponent } from '../ToastComponent/ToastComponent'
import { Toast } from '../../types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

type Props = {
  toasts: Toast[]
  dismiss: (id: string) => void
}
export const ToastGroupComponent = (props: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.toasts}>
        <TransitionGroup>
          {props.toasts.map((toast) => (
            <CSSTransition
              key={toast.id}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false)
              }}
              classNames="t-fadeUp"
            >
              <div className={styles.toast} key={toast.id}>
                <ToastComponent toast={toast} dismiss={props.dismiss} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}
