import { UnixTime } from '@/types/UnixTime'

export type Notification = {
  text: string
  date: UnixTime
  onClick: () => void
}
