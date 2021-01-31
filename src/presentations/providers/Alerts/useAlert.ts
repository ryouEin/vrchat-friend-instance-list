import { useContext } from 'react'
import { AlertsContext } from './AlertsContext'

export const useAlert = () => {
  return useContext(AlertsContext)
}
