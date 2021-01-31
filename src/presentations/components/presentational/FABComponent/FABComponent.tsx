import styles from './style.module.scss'
import { Color, Colors } from '../../../Colors'
import { convertColorToRGBString } from '../../../shame/ColorUtil'
import classNames from 'classnames'

const Positions = {
  Left: 'left',
  Right: 'right',
} as const
type Position = typeof Positions[keyof typeof Positions]

type Props = {
  children?: JSX.Element
  color?: Color
  position?: Position
  onClick?: () => void
}
export const FABComponent = (props: Props) => {
  const color = props.color ?? Colors.White
  const position = props.position ?? Positions.Right

  const rootStyle = {
    backgroundColor: convertColorToRGBString(color),
  }

  const rootClass = classNames([
    styles.root,
    position === Positions.Right ? styles.right : styles.left,
  ])

  const onClick = () => {
    if (props.onClick !== undefined) {
      props.onClick()
    }
  }

  return (
    <div className={rootClass} style={rootStyle} onClick={onClick}>
      {props.children}
    </div>
  )
}
