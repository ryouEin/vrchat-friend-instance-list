import styles from './style.module.scss'
import { FavoriteLimit, Friend } from '../../../../../../../types'
import { FavoriteMarkComponent } from '../../../../../../presentational/FavoriteMarkComponent/FavoriteMarkComponent'
import { useVisibilityManager } from '../../../../../../../hooks/useVisibilityManager'
import { FavoriteDialogComponent } from './components/FavoriteDialogComponent/FavoriteDialogComponent'
import { FavoriteTag } from '../../../../../../../../types'
import { useState } from 'react'
import { SpinnerComponent } from '../../../../../../presentational/SpinnerComponent/SpinnerComponent'
import { UnfavoriteDialogComponent } from './components/UnfavoriteDialogComponent/UnfavoriteDialogComponent'
import { UserListItemFriend } from '../../types'

type Props = {
  friend: UserListItemFriend
  fetchFavoriteLimits: () => Promise<FavoriteLimit[]>
  favoriteFriend: (friend: Friend, tag: FavoriteTag) => Promise<void>
  unfavoriteFriend: (friend: Friend) => Promise<void>
}
export const UserListItemComponent = (props: Props) => {
  const isFavorites = props.friend.favorite !== undefined

  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)

  const favoriteDialog = useVisibilityManager(false)

  const favoriteFriend = async (tag: FavoriteTag) => {
    if (isLoadingFavorite) return

    setIsLoadingFavorite(true)
    favoriteDialog.hide()
    await props.favoriteFriend(props.friend, tag).finally(() => {
      setIsLoadingFavorite(false)
    })
  }

  const unfavoriteDialog = useVisibilityManager(false)
  const unfavoriteFriend = async () => {
    if (isLoadingFavorite) return

    setIsLoadingFavorite(true)
    unfavoriteDialog.hide()
    await props.unfavoriteFriend(props.friend).finally(() => {
      setIsLoadingFavorite(false)
    })
  }

  return (
    <div className={styles.root}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img
        className={styles.userImage}
        src={props.friend.currentAvatarThumbnailImageUrl}
        key={props.friend.currentAvatarThumbnailImageUrl}
      />
      {props.friend.isOwner ? <div className={styles.owner}>Owner</div> : null}

      {isLoadingFavorite ? (
        <div className={styles.favorite}>
          <div className={styles.favoriteLoadingSpinner}>
            <SpinnerComponent size={18} color="yellow" />
          </div>
        </div>
      ) : isFavorites ? (
        <div className={styles.favorite} onClick={unfavoriteDialog.show}>
          <FavoriteMarkComponent />
        </div>
      ) : (
        <div className={styles.favorite} onClick={favoriteDialog.show}>
          <FavoriteMarkComponent isInactive />
        </div>
      )}

      <div className={styles.userDetail}>
        <div className={styles.displayName}>{props.friend.displayName}</div>
      </div>

      <FavoriteDialogComponent
        isVisible={favoriteDialog.isVisible}
        friend={props.friend}
        fetchFavoriteLimits={props.fetchFavoriteLimits}
        onClickFavorite={favoriteFriend}
        hide={favoriteDialog.hide}
      />
      <UnfavoriteDialogComponent
        isVisible={unfavoriteDialog.isVisible}
        friend={props.friend}
        onClickUnfavorite={unfavoriteFriend}
        hide={unfavoriteDialog.hide}
      />
    </div>
  )
}
