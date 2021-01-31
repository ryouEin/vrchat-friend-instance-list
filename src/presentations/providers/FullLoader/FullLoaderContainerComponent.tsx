import { useFullLoader } from './useFullLoader'
import { FullLoaderComponent } from './FullLoaderComponent/FullLoaderComponent'

export const FullLoaderContainerComponent = () => {
  const { isVisible } = useFullLoader()

  return <FullLoaderComponent isVisible={isVisible} />
}
