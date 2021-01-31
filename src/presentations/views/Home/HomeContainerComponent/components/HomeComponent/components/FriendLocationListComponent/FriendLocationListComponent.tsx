import styles from './style.module.scss'
import { ToTopButtonComponent } from '../../../../../../../components/presentational/ToTopButtonComponent/ToTopButtonComponent'
import { FriendLocation } from '../../../../../../../types'
import { useWindowScroll } from 'react-use'
import LazyLoad, { forceCheck } from 'react-lazyload'
import { useEffect } from 'react'
import { SpinnerComponent } from '../../../../../../../components/presentational/SpinnerComponent/SpinnerComponent'

// スクロールの度にリスト全体の再レンダリングされるのを防ぐために分割
const ToTop = () => {
  const { y } = useWindowScroll()
  const scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  return <ToTopButtonComponent scrollTop={y} onClick={scrollToTop} />
}

type Props = {
  beforeContent?: JSX.Element
  afterContent?: JSX.Element
  friendLocations: FriendLocation[]
  rowItem: (friendLocation: FriendLocation) => JSX.Element
}
export const FriendLocationListComponent = (props: Props) => {
  useEffect(() => {
    forceCheck()
  }, [props.friendLocations])

  return (
    <div className={styles.root}>
      {props.beforeContent !== undefined ? props.beforeContent : null}
      {props.friendLocations.map((friendLocation) => (
        <div className={styles.item} key={friendLocation.id}>
          <LazyLoad
            height={220}
            offset={500}
            placeholder={
              <div className={styles.listItemPlaceholder}>
                <SpinnerComponent color="front" />
              </div>
            }
          >
            {props.rowItem(friendLocation)}
          </LazyLoad>
        </div>
      ))}
      {props.afterContent !== undefined ? props.afterContent : null}
      <div className={styles.toTop}>
        <ToTop />
      </div>
    </div>
  )
}
