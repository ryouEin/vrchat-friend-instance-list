import { Friend } from '../../../types'

type Props = {
  className?: string
  friend: Friend
}
export const FriendImageComponent = ({ friend, className = '' }: Props) => {
  const url =
    friend.profilePicOverride.length > 0
      ? friend.profilePicOverride
      : friend.currentAvatarThumbnailImageUrl

  return <img className={className} src={url} alt="" />
}
