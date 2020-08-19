import { INewsLastCheckRepository } from '@/infras/News/INewsLastCheckRepository'
import LocalStorage from '@/libs/Storage/LocalStorage'

const KEY = 'lastCheckNewsAt'
const storage = new LocalStorage()

export class KeyValueStorageNewsLastCheckRepository
  implements INewsLastCheckRepository {
  setLastCheckNewsAt(unixtime: number): void {
    storage.setItem(KEY, String(unixtime))
  }

  getLastCheckNewsAt(): number | undefined {
    const tmp = storage.getItem(KEY)

    if (tmp === undefined) return undefined

    return Number(tmp)
  }
}
