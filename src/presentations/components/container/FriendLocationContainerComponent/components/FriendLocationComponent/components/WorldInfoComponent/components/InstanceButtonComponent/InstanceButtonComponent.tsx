import styles from './style.module.scss'
import classNames from 'classnames'

type Props = {
  children?: JSX.Element
  fontSize?: number
  isDisabled?: boolean
  onClick?: () => void
}
export const InstanceButtonComponent = (props: Props) => {
  const fontSize = props.fontSize ?? 16
  const isDisabled = props.isDisabled ?? false

  const rootStyle = {
    fontSize: `${fontSize}px`,
  }

  const rootClass = classNames(styles.root, {
    [styles.disabled]: isDisabled,
  })

  const onClick = () => {
    if (props.onClick !== undefined) props.onClick()
  }

  return (
    <button className={rootClass} style={rootStyle} onClick={onClick}>
      <span className={styles.text}>{props.children}</span>
    </button>
  )
}
