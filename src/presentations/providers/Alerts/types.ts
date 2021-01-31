export type NewAlert = {
  title: string
  content?: string
  contentSlot?: JSX.Element
  buttons?: (close: () => void) => JSX.Element[]
}

export type Alert = NewAlert & {
  id: string
}
