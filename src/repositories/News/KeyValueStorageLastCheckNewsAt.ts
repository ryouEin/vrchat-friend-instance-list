import { ILastCheckNewsAt } from './ILastCheckNewsAt'
import LocalStorage from '../../libs/Storage/LocalStorage'

const KEY = 'lastCheckNewsAt'
const storage = new LocalStorage()

export class KeyValueStorageLastCheckNewsAt implements ILastCheckNewsAt {
  setLastCheckNewsAt(unixtime: number): void {
    storage.setItem(KEY, String(unixtime))
  }

  getLastCheckNewsAt(): number | undefined {
    const tmp = storage.getItem(KEY)

    if (tmp === undefined) return undefined

    return Number(tmp)
  }
}
