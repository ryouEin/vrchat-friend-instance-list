import { INewsStorage } from '@/infras/News/Storage/INewsStorage'
import Storage from '@/libs/Storage/Storage'

const KEY = 'lastCheckNewsAt'
const storage = new Storage()

export class NewsStorage implements INewsStorage {
  setLastCheckNewsAt(unixtime: number): void {
    storage.setItem(KEY, String(unixtime))
  }

  getLastCheckNewsAt(): number | undefined {
    const tmp = storage.getItem(KEY)

    if (tmp === undefined) return undefined

    return Number(tmp)
  }
}
