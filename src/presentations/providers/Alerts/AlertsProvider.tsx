import { ReactNode, useCallback, useMemo, useState } from 'react'
import { uid } from 'uid'
import { Alert, NewAlert } from './types'
import { AlertsContext } from './AlertsContext'

type Props = {
  children: ReactNode
}
export const AlertsProvider = (props: Props) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const alert = useCallback((alert: NewAlert) => {
    setAlerts((alerts) =>
      alerts.concat([
        {
          ...alert,
          id: uid(10),
        },
      ])
    )
  }, [])
  const dismissAlert = useCallback((id: string) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id))
  }, [])

  const context: AlertsContext = useMemo(() => {
    return {
      alerts,
      alert,
      dismissAlert,
    }
  }, [alerts, alert, dismissAlert])

  return (
    <AlertsContext.Provider value={context}>
      {props.children}
    </AlertsContext.Provider>
  )
}
