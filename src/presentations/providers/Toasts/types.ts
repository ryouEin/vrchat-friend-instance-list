export const ToastTypes = {
  Info: 'info',
  Warn: 'warn',
  Error: 'error',
  Success: 'success',
} as const
export type ToastType = typeof ToastTypes[keyof typeof ToastTypes]

export type NewToast = {
  type: ToastType
  content: string
}

export type Toast = NewToast & {
  id: string
}
