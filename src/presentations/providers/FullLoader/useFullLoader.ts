import { useContext } from 'react'
import { FullLoaderContext } from './FullLoaderContext'

export const useFullLoader = () => {
  return useContext(FullLoaderContext)
}
