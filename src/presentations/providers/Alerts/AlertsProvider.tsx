import { ReactNode, useState } from 'react'
import { uid } from 'uid'
import { Alert, NewAlert } from './types'
import { AlertsContext } from './AlertsContext'

type Props = {
  children: ReactNode
}
export const AlertsProvider = (props: Props) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const context: AlertsContext = {
    alerts,
    alert: (alert: NewAlert) => {
      setAlerts((alerts) =>
        alerts.concat([
          {
            ...alert,
            id: uid(10),
          },
        ])
      )
    },
    dismissAlert: (id: string) => {
      setAlerts((alerts) => alerts.filter((alert) => alert.id !== id))
    },
  }

  return (
    <AlertsContext.Provider value={context}>
      {props.children}
    </AlertsContext.Provider>
  )
}
