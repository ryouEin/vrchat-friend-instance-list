import { UnixTime } from '@/types'

export interface ILastCheckNewsAt {
  setLastCheckNewsAt(unixtime: UnixTime): void
  getLastCheckNewsAt(): UnixTime | undefined
}
