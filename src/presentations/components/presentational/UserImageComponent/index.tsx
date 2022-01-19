import { User } from '../../../types'

type Props = {
  className?: string
  user: User
}
export const UserImageComponent = ({ user, className = '' }: Props) => {
  const url =
    user.profilePicOverride.length > 0
      ? user.profilePicOverride
      : user.currentAvatarThumbnailImageUrl

  return <img className={className} src={url} alt="" />
}
