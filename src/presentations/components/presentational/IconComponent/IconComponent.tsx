import styles from './style.module.scss'
import { Color, Colors } from '../../../Colors'
import { convertColorToRGBString } from '../../../shame/ColorUtil'

type Props = {
  icon: string
  size?: number
  color?: Color
}
export const IconComponent = (props: Props) => {
  const size = props.size ?? 16
  const color = props.color ?? Colors.Black

  const rootStyle = {
    fontSize: `${size}px`,
    color: convertColorToRGBString(color),
  }

  return (
    <i className={`material-icons ${styles.root}`} style={rootStyle}>
      {props.icon}
    </i>
  )
}
