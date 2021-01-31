import styles from './style.module.scss'
import { ToggleComponent } from '../../../../../../../components/presentational/ToggleComponent/ToggleComponent'
import { SelectComponent } from '../../../../../../../components/presentational/SelectComponent/SelectComponent'

export const Orders = {
  Default: 'default',
  FriendsDesc: 'friends_desc',
  FriendsAsc: 'friends_asc',
} as const
export type Order = typeof Orders[keyof typeof Orders]

const orderSelectItems: { label: string; value: Order }[] = [
  {
    label: 'なし',
    value: Orders.Default,
  },
  {
    label: 'フレンドが多い順',
    value: Orders.FriendsDesc,
  },
  {
    label: 'フレンドが少ない順',
    value: Orders.FriendsAsc,
  },
]

type Props = {
  showOnlyFavoriteFriends: boolean
  order: Order
  onChangeFilter: (showOnlyFavoriteFriends: boolean) => void
  onChangeOrder: (order: Order) => void
}
export const FriendLocationFilterComponent = (props: Props) => {
  const onFilterChange = (checked: boolean) => {
    props.onChangeFilter(checked)
  }

  const onChangeOrder = (order: Order) => {
    props.onChangeOrder(order)
  }

  return (
    <div className={styles.filterArea}>
      <div className={styles.toggleButtonGroup}>
        <div className={styles.toggleButtonGroupToggle}>
          <ToggleComponent
            checked={props.showOnlyFavoriteFriends}
            onChange={onFilterChange}
          />
        </div>
        <div className={styles.toggleButtonGroupLabel}>
          Favoriteユーザのみ表示
        </div>
      </div>
      <div className={styles.sortGroup}>
        <div className={styles.sortGroupTitle}>ソート</div>
        <div className={styles.sortGroupSelect}>
          <SelectComponent
            items={orderSelectItems}
            value={props.order}
            onChange={onChangeOrder}
          />
        </div>
      </div>
    </div>
  )
}
