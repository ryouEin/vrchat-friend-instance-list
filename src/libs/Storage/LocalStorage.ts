import { IKeyValueStorage } from './IKeyValueStorage'

export default class LocalStorage implements IKeyValueStorage {
  clear() {
    localStorage.clear()
  }

  getItem(key: string): string | undefined {
    const item = localStorage.getItem(key)
    if (item === null) {
      return undefined
    }

    return item
  }

  setItem(key: string, content: string): void {
    localStorage.setItem(key, content)
  }
}
