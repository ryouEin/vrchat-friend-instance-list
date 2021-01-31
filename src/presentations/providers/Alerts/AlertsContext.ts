import { createContext } from 'react'
import { Alert, NewAlert } from './types'

export type AlertsContext = {
  alerts: Alert[]
  alert: (alert: NewAlert) => void
  dismissAlert: (id: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AlertsContext = createContext<AlertsContext>(undefined!)
