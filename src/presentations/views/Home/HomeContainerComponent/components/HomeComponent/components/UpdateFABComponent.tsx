import { FABComponent } from '../../../../../../components/presentational/FABComponent/FABComponent'
import { SpinnerComponent } from '../../../../../../components/presentational/SpinnerComponent/SpinnerComponent'
import { IconComponent } from '../../../../../../components/presentational/IconComponent/IconComponent'
import { useState } from 'react'

type Props = {
  onClick: () => Promise<void>
}
export const UpdateFABComponent = (props: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const onClick = async () => {
    if (isUpdating) return

    setIsUpdating(true)
    await props.onClick().finally(() => {
      setIsUpdating(false)
    })
  }

  return (
    <FABComponent color="main" onClick={onClick}>
      {isUpdating ? (
        <SpinnerComponent color="white" />
      ) : (
        <IconComponent size={50} color="white" icon="refresh" />
      )}
    </FABComponent>
  )
}
