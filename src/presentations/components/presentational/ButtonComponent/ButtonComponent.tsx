import styles from './style.module.scss'
import { Color, Colors } from '../../../Colors'
import classNames from 'classnames'
import { convertColorToRGBString } from '../../../shame/ColorUtil'

const Sizes = {
  Default: 'default',
  Large: 'large',
} as const
type Size = typeof Sizes[keyof typeof Sizes]

type Props = {
  children?: JSX.Element
  color?: Color
  size?: Size
  isFull?: boolean
  isDisabled?: boolean
  onClick?: () => void
}
export const ButtonComponent = (props: Props) => {
  const color = props.color ?? Colors.Secondary
  const size = props.size ?? Sizes.Default
  const isFull = props.isFull ?? false
  const isDisabled = props.isDisabled ?? false

  const rootStyle = {
    backgroundColor: convertColorToRGBString(color),
  }

  const rootClass = classNames(styles.root, {
    [styles.large]: size === Sizes.Large,
    [styles.full]: isFull,
    [styles.disabled]: isDisabled,
  })

  const onClick = () => {
    if (props.onClick !== undefined) props.onClick()
  }

  return (
    <span className={rootClass} style={rootStyle} onClick={onClick}>
      {props.children}
    </span>
  )
}
