import { UnixTime } from '@/types/UnixTime'

export interface INewsStorage {
  setLastCheckNewsAt(unixtime: UnixTime): void
  getLastCheckNewsAt(): UnixTime | undefined
}
