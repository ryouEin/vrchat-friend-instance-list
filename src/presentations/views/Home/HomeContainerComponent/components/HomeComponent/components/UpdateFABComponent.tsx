import { FABComponent } from '../../../../../../components/presentational/FABComponent/FABComponent'
import { SpinnerComponent } from '../../../../../../components/presentational/SpinnerComponent/SpinnerComponent'
import { IconComponent } from '../../../../../../components/presentational/IconComponent/IconComponent'
import { useState } from 'react'
import { FORCE_EXCEPTION } from '../../../../../../../config/config'

type Props = {
  onClick: () => Promise<void>
}
export const UpdateFABComponent = (props: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)

  const onClick = async () => {
    if (FORCE_EXCEPTION()) {
      throw new Error('exception for error notification check.')
    }

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
