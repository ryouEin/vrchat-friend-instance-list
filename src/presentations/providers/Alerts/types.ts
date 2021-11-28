export type NewAlert = {
  title: string
  content?: string
  contentSlot?: JSX.Element
  buttons?: (close: () => void) => JSX.Element[]
  onClose?: () => void
}

export type Alert = NewAlert & {
  id: string
}
