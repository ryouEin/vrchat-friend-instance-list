import { DialogComponent } from '../../../../../../../../presentational/DialogComponent/DialogComponent'
import { ButtonComponent } from '../../../../../../../../presentational/ButtonComponent/ButtonComponent'
import { useEffect, useState } from 'react'
import { UserImageComponent } from '../../../../../../../../presentational/UserImageComponent'
import { usersRepository } from '../../../../../../../../../../factory/repository'
import styles from './style.module.scss'
import { SpinnerComponent } from '../../../../../../../../presentational/SpinnerComponent/SpinnerComponent'

// TODO: Userに関する似た型がいろいろな箇所に出てくるのどうにかならんか
type User = {
  id: string
  username: string
  displayName: string
  currentAvatarImageUrl: string
  currentAvatarThumbnailImageUrl: string
  profilePicOverride: string
}

type Props = {
  userId: string
  isVisible: boolean
  hide: () => void
}
export const InstanceOwnerDialogComponent = (props: Props) => {
  const [owner, setOwner] = useState<User | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      if (props.isVisible) {
        const user = await usersRepository.fetchUser(props.userId)
        setOwner(user)
      }
    })()
  }, [props.userId, props.isVisible])

  return (
    <DialogComponent
      isVisible={props.isVisible}
      title="インスタンスオーナー"
      contentSlot={
        <>
          {owner !== undefined ? (
            <div className={styles.user}>
              <UserImageComponent className={styles.userImage} user={owner} />
              <div className={styles.userName}>{owner.displayName}</div>
            </div>
          ) : (
            <div className={styles.loading}>
              <SpinnerComponent />
            </div>
          )}
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
