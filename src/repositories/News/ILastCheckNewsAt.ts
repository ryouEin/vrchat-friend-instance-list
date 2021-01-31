import { MSecUnixTime } from '../../types'

export interface ILastCheckNewsAt {
  setLastCheckNewsAt(unixtime: MSecUnixTime): void
  getLastCheckNewsAt(): MSecUnixTime | undefined
}
