import styles from './style.module.scss'
import { SpinnerComponent } from '../../../components/presentational/SpinnerComponent/SpinnerComponent'
import { CSSTransition } from 'react-transition-group'

type Props = {
  isVisible: boolean
}
export const FullLoaderComponent = (props: Props) => {
  return (
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
        <SpinnerComponent color="white" />
      </div>
    </CSSTransition>
  )
}
