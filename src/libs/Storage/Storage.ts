import IStorage from '@/libs/Storage/IStorage'

export default class Storage implements IStorage {
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
