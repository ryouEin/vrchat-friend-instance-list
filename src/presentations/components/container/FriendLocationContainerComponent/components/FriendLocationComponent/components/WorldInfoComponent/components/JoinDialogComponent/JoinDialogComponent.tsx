import { DialogComponent } from '../../../../../../../../presentational/DialogComponent/DialogComponent'
import styles from './style.module.scss'
import { ButtonComponent } from '../../../../../../../../presentational/ButtonComponent/ButtonComponent'
import { Instance } from '../../../../../../../../../types'
import { useFullLoader } from '../../../../../../../../../providers/FullLoader/useFullLoader'
import { useToast } from '../../../../../../../../../providers/Toasts/useToast'
import { ToastTypes } from '../../../../../../../../../providers/Toasts/types'

type Props = {
  instance: Instance
  isVisible: boolean
  inviteMe: (instance: Instance) => Promise<void>
  hide: () => void
}
export const JoinDialogComponent = (props: Props) => {
  const fullLoader = useFullLoader()
  const { toast } = useToast()

  const join = () => {
    window.location.href = `vrchat://launch?id=${props.instance.id}`
  }

  const onClickInviteMe = async () => {
    fullLoader.show()
    await props.inviteMe(props.instance).finally(() => {
      fullLoader.hide()
    })
    toast({
      type: ToastTypes.Success,
      content:
        'Inviteの送信に成功しました（VRChat内で届くまではタイムラグがあります）',
    })
    props.hide()
  }

  return (
    <DialogComponent
      isVisible={props.isVisible}
      title="JOIN"
      contentSlot={
        <>
          <div className="u-mb20">
            <ButtonComponent size="large" isFull onClick={join}>
              <span>JOIN</span>
            </ButtonComponent>
            <p className={styles.note}>
              VRChatを新しく再起動し、インスタンスにJOINする
            </p>
          </div>
          <div>
            <ButtonComponent size="large" isFull onClick={onClickInviteMe}>
              <span>INVITE ME</span>
            </ButtonComponent>
            <p className={styles.note}>
              自分自身にインスタンスへのInviteを送信する
            </p>
          </div>
        </>
      }
      buttons={[
        <ButtonComponent color="gray" onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
      ]}
    />
  )
}
