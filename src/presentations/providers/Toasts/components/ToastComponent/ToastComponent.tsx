import styles from './style.module.scss'
import { IconComponent } from '../../../../components/presentational/IconComponent/IconComponent'
import { useEffect, useMemo } from 'react'
import { Color, Colors } from '../../../../Colors'
import { convertColorToRGBString } from '../../../../shame/ColorUtil'
import { Toast, ToastTypes } from '../../types'

type Props = {
  toast: Toast
  dismiss: (id: string) => void
}
export const ToastComponent = (props: Props) => {
  const toastId = props.toast.id
  const type = props.toast.type
  const dismiss = props.dismiss

  const Icon = () => {
    if (type === ToastTypes.Error) {
      return <IconComponent color="white" size={26} icon="error" />
    }
    if (type === ToastTypes.Warn) {
      return <IconComponent color="white" size={26} icon="warning" />
    }
    if (type === ToastTypes.Info) {
      return <IconComponent color="white" size={26} icon="check_circle" />
    }
    if (type === ToastTypes.Success) {
      return <IconComponent color="white" size={26} icon="check_circle" />
    }

    throw new Error(`unknown toast type ${type}`)
  }

  const backgroundColor: Color = useMemo<Color>(() => {
    switch (type) {
      case ToastTypes.Error:
        return Colors.Danger
      case ToastTypes.Warn:
        return Colors.Warning
      case ToastTypes.Success:
        return Colors.Primary
    }
    return Colors.Gray
  }, [type])
  const rootStyle = {
    backgroundColor: convertColorToRGBString(backgroundColor),
  }

  useEffect(() => {
    const tid = setTimeout(() => {
      dismiss(toastId)
    }, 5 * 1000)

    return () => {
      clearTimeout(tid)
    }
  }, [dismiss, toastId])

  return (
    <div
      className={styles.root}
      style={rootStyle}
      onClick={() => {
        dismiss(toastId)
      }}
    >
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.content}>{props.toast.content}</div>
    </div>
  )
}
