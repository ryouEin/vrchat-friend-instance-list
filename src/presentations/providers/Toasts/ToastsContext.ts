import { createContext } from 'react'
import { NewToast, Toast } from './types'

export type ToastsContext = {
  toasts: Toast[]
  toast: (toast: NewToast) => void
  dismissToast: (id: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ToastsContext = createContext<ToastsContext>(undefined!)
