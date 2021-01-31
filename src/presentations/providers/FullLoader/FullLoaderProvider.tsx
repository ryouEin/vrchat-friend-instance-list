import { ReactNode, useMemo } from 'react'
import { FullLoaderContext } from './FullLoaderContext'
import { useCounter } from 'react-use'

type Props = {
  children: ReactNode
}
export const FullLoaderProvider = (props: Props) => {
  const [visibilityCounter, { inc, dec }] = useCounter(0)

  const context: FullLoaderContext = {
    isVisible: useMemo(() => visibilityCounter > 0, [visibilityCounter]),
    show: inc,
    hide: dec,
  }

  return (
    <FullLoaderContext.Provider value={context}>
      {props.children}
    </FullLoaderContext.Provider>
  )
}
