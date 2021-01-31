import { useContext } from 'react'
import { ToastsContext } from './ToastsContext'

export const useToast = () => {
  return useContext(ToastsContext)
}
