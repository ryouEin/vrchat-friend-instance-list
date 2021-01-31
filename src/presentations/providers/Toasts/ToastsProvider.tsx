import { ReactNode, useCallback, useState } from 'react'
import { uid } from 'uid'
import { ToastsContext } from './ToastsContext'
import { NewToast, Toast } from './types'

type Props = {
  children: ReactNode
}
export const ToastsProvider = (props: Props) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const context: ToastsContext = {
    toasts,
    toast: (toast: NewToast) => {
      setToasts((toasts) =>
        toasts.concat([
          {
            ...toast,
            id: uid(10),
          },
        ])
      )
    },
    dismissToast: useCallback(
      (id: string) => {
        setToasts((toasts) => toasts.filter((toast) => toast.id !== id))
      },
      [setToasts]
    ),
  }

  return (
    <ToastsContext.Provider value={context}>
      {props.children}
    </ToastsContext.Provider>
  )
}
