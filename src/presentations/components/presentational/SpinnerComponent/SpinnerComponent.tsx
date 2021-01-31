import styles from './style.module.scss'
import { Color, Colors } from '../../../Colors'
import { convertColorToRGBString } from '../../../shame/ColorUtil'

type Props = {
  color?: Color
  size?: number
}
export const SpinnerComponent = (props: Props) => {
  const color = props.color ?? Colors.Main
  const size = props.size ?? 48

  const rootStyle = {
    width: `${size}px`,
    height: `${size}px`,
    lineHeight: `${size}px`,
    color: convertColorToRGBString(color),
  }

  return (
    <div className={styles.root} style={rootStyle}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715"
        className={styles.svg}
        style={{ transform: 'rotate(0deg)' }}
      >
        <circle
          fill="transparent"
          cx="45.714285714285715"
          cy="45.714285714285715"
          r="20"
          strokeWidth="5.714285714285714"
          strokeDasharray="125.664"
          strokeDashoffset="125.66370614359172px"
          className={styles.circle}
        />
      </svg>
    </div>
  )
}
