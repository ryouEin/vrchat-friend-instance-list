import { UnixTime } from '@/types'

export interface INewsLastCheckRepository {
  setLastCheckNewsAt(unixtime: UnixTime): void
  getLastCheckNewsAt(): UnixTime | undefined
}
