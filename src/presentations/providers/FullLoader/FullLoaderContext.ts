import { createContext } from 'react'

export type FullLoaderContext = {
  isVisible: boolean
  show: () => void
  hide: () => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FullLoaderContext = createContext<FullLoaderContext>(undefined!)
