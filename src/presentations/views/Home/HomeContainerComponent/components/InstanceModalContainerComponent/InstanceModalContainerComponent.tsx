import { useParams } from 'react-router-dom'
import { FriendLocation } from '../../../../../types'
import { useMemo } from 'react'
import { InstanceModalComponent } from './components/InstanceModalComponent/InstanceModalComponent'
import { NotFoundErrorComponent } from './components/NotFoundErrorComponent/NotFoundErrorComponent'
import { useAppRouting } from '../../../../../hooks/useAppRouting'

type Props = {
  children: (friendLocation: FriendLocation) => JSX.Element
  friendLocations: FriendLocation[]
}
export const InstanceModalContainerComponent = (props: Props) => {
  // TODO: 型安全にできない？
  const { id } = useParams<{ id: string }>()
  const { toHome } = useAppRouting()

  const friendLocation = useMemo<FriendLocation | undefined>(() => {
    return props.friendLocations.find((item) => item.id === id)
  }, [props.friendLocations, id])

  return (
    <InstanceModalComponent hide={toHome}>
      {props.children !== undefined ? (
        friendLocation !== undefined ? (
          props.children(friendLocation)
        ) : (
          <NotFoundErrorComponent />
        )
      ) : (
        <></>
      )}
    </InstanceModalComponent>
  )
}
