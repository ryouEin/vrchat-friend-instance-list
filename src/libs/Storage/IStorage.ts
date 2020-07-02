export default interface IStorage {
  clear(): void
  getItem(key: string): string | undefined
  setItem(key: string, content: string): void
}
