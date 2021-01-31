import { IKeyValueStorage } from './IKeyValueStorage'

export class InMemoryKeyValueStorage implements IKeyValueStorage {
  private items: { [key: string]: string } = {}

  getItem(key: string): string | undefined {
    return this.items[key]
  }

  setItem(key: string, content: string) {
    this.items[key] = content
  }

  clear() {
    this.items = {}
  }
}
