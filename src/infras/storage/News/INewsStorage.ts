import { UnixTime } from '@/types'

export interface INewsStorage {
  setLastCheckNewsAt(unixtime: UnixTime): void
  getLastCheckNewsAt(): UnixTime | undefined
}
