import { DialogComponent } from '../../../../../../../../presentational/DialogComponent/DialogComponent'
import { ButtonComponent } from '../../../../../../../../presentational/ButtonComponent/ButtonComponent'
import { SelectComponent } from '../../../../../../../../presentational/SelectComponent/SelectComponent'
import { useState } from 'react'
import { useAlert } from '../../../../../../../../../providers/Alerts/useAlert'
import {
  NOTIFICATION_PERMISSION_ALERT,
  NOTIFICATION_PERMISSION_WHEN_DENIED_ALERT,
} from '../../../../../../../../../providers/Alerts/AlertDefinitions'

const generateSelectItems: (
  count: number
) => { label: string; value: number }[] = (count: number) => {
  const tmp = []
  for (let index = 1; index <= count; index++) {
    tmp.push({
      label: String(index),
      value: index,
    })
  }

  return tmp
}
const selectItems = generateSelectItems(15)

type Props = {
  isVisible: boolean
  onClickWatchStart: (notifyFreeSpaceNum: number) => void
  hide: () => void
}
export const WatchDialogComponent = (props: Props) => {
  const { alert } = useAlert()
  const [notifyFreeSpaceNum, setNotifyFreeSpaceNum] = useState(1)
  const onChangeSelect = (value: number) => {
    setNotifyFreeSpaceNum(value)
  }

  const checkNotificationPermission = () => {
    const permission = Notification.permission
    if (permission === 'default') {
      alert(NOTIFICATION_PERMISSION_ALERT)
    } else if (permission === 'denied') {
      alert(NOTIFICATION_PERMISSION_WHEN_DENIED_ALERT)
    }
  }

  const onClickWatchStart = () => {
    props.onClickWatchStart(notifyFreeSpaceNum)
    props.hide()
    checkNotificationPermission()
  }

  return (
    <DialogComponent
      isVisible={props.isVisible}
      title="インスタンス空き状況監視"
      contentSlot={
        <>
          <div className="u-mb20">
            監視開始ボタンを押すことで、一定数以上の空きを確認次第通知します。
            <br />
            （1分毎に空き状況を自動で確認します。）
          </div>
          <div className="u-alignCenter">
            <span className="u-mr5">
              <SelectComponent
                items={selectItems}
                value={notifyFreeSpaceNum}
                onChange={onChangeSelect}
              />
            </span>
            人以上の空きで通知
          </div>
        </>
      }
      buttons={[
        <ButtonComponent color="gray" onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
        <ButtonComponent color="primary" onClick={onClickWatchStart}>
          <span>監視開始</span>
        </ButtonComponent>,
      ]}
    />
  )
}
