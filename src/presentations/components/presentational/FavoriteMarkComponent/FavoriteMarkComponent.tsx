import styles from './style.module.scss'
import classNames from 'classnames'

type Props = {
  isInactive?: boolean
}
export const FavoriteMarkComponent = (props: Props) => {
  const isInactive = props.isInactive ?? false

  const rootClass = classNames([
    styles.root,
    {
      [styles.inactive]: isInactive,
    },
  ])

  return (
    <div className={rootClass}>
      <i className="material-icons">{isInactive ? 'star_outline' : 'star'}</i>
    </div>
  )
}
