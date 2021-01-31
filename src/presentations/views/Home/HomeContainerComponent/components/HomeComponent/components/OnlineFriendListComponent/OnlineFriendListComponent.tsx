import styles from './style.module.scss'
import { Friend } from '../../../../../../../types'
import { OnlineFriendListItemComponent } from '../OnlineFriendListItemComponent/OnlineFriendListItemComponent'
import { AutoSizer, List, OnScrollParams } from 'react-virtualized'
import { ToTopButtonComponent } from '../../../../../../../components/presentational/ToTopButtonComponent/ToTopButtonComponent'
import { useRef, useState } from 'react'

type Props = {
  friends: Friend[]
  onClickOnlineFriend: (friend: Friend) => void
}
export const OnlineFriendListComponent = (props: Props) => {
  const [scrollTop, setScrollTop] = useState(0)
  const onScroll = (params: OnScrollParams) => {
    setScrollTop(params.scrollTop)
  }

  const listRef = useRef<List | null>(null)
  const scrollToTop = () => {
    if (listRef.current === null) {
      throw new Error('listRef current is null')
    }
    listRef.current.scrollToPosition(0)
  }

  return (
    <div className={styles.root}>
      <AutoSizer>
        {({ height, width }) => (
          // TODO: outline: noneは本当はしたくないが…
          <List
            ref={listRef}
            style={{ outline: 'none', overscrollBehavior: 'none' }}
            height={height}
            width={width}
            rowHeight={80}
            onScroll={onScroll}
            rowCount={props.friends.length}
            rowRenderer={({ index, key, style }) => (
              <div key={key} style={style}>
                <div className={styles.item}>
                  <OnlineFriendListItemComponent
                    friend={props.friends[index]}
                    onClickOnlineFriend={props.onClickOnlineFriend}
                  />
                </div>
              </div>
            )}
          />
        )}
      </AutoSizer>
      <div className={styles.toTop}>
        <ToTopButtonComponent scrollTop={scrollTop} onClick={scrollToTop} />
      </div>
    </div>
  )
}
