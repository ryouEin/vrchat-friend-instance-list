import { useAlert } from './useAlert'
import { DialogComponent } from '../../components/presentational/DialogComponent/DialogComponent'
import { ButtonComponent } from '../../components/presentational/ButtonComponent/ButtonComponent'

export const AlertContainerComponent = () => {
  const { alerts, dismissAlert } = useAlert()

  if (alerts.length <= 0) return null

  const alert = alerts[0]
  const close = () => {
    dismissAlert(alert.id)
  }

  const contentSlot = alert.contentSlot ?? <div>{alert.content}</div>

  const buttons =
    alert.buttons !== undefined
      ? alert.buttons(close)
      : [
          <ButtonComponent onClick={close}>
            <span>閉じる</span>
          </ButtonComponent>,
        ]

  return (
    <DialogComponent
      isVisible={true}
      title={alert.title}
      contentSlot={contentSlot}
      buttons={buttons}
    />
  )
}
