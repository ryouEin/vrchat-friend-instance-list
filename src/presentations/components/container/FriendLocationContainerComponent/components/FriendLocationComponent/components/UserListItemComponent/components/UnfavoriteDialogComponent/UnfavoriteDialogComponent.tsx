import { Friend } from '../../../../../../../../../types'
import { DialogComponent } from '../../../../../../../../presentational/DialogComponent/DialogComponent'
import { ButtonComponent } from '../../../../../../../../presentational/ButtonComponent/ButtonComponent'

type Props = {
  friend: Friend
  onClickUnfavorite: () => void
  isVisible: boolean
  hide: () => void
}
export const UnfavoriteDialogComponent = (props: Props) => {
  return (
    <DialogComponent
      isVisible={props.isVisible}
      title={`Unfavorite ${props.friend.displayName}`}
      contentSlot={
        <>
          <div className="u-mb20">
            {props.friend.displayName}のお気に入りを解除しますか？
          </div>
        </>
      }
      buttons={[
        <ButtonComponent onClick={props.hide}>
          <span>閉じる</span>
        </ButtonComponent>,
        <ButtonComponent color="danger" onClick={props.onClickUnfavorite}>
          <span>Unfavorite</span>
        </ButtonComponent>,
      ]}
    />
  )
}
