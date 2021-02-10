import { DialogComponent } from '../../../../../../../components/presentational/DialogComponent/DialogComponent'
import { ButtonComponent } from '../../../../../../../components/presentational/ButtonComponent/ButtonComponent'
import { MarkdownTextComponent } from '../../../../../../../components/presentational/MarkdownTextComponent/MarkdownTextComponent'

type Props = {
  isVisible: boolean
  hide: () => void
}
export const AboutCapacityDialogComponent = (props: Props) => {
  return (
    <DialogComponent
      isVisible={props.isVisible}
      title="インスタンスの最大人数に関して"
      contentSlot={
        <MarkdownTextComponent
          markdownText={`インスタンスの現在人数及び最大人数は、「現在人数 / 最大人数」という形でインスタンスのサムネイル右肩に表記しています。

インスタンスには、ワールドのcapacityの2倍の人数が実際には入れます。（例外として、capacityが1の場合は1人しか入れません）

表記している最大人数は、インスタンスに実際入れる人数を上の基準で計算の上表記しています。`}
        />
      }
      buttons={[
        <ButtonComponent onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
      ]}
    />
  )
}
