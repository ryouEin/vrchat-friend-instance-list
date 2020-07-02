import { VersionInfo } from '@/domains/VersionHistory/VersionInfo'

// バージョン履歴を降順で保管
export class VersionHistory {
  private readonly _history: VersionInfo[]

  constructor(history: VersionInfo[]) {
    const shallowCopiedHistory = [...history]

    this._history = shallowCopiedHistory.sort((a, b) => {
      return a.version.isNewerThan(b.version) ? -1 : 1
    })
  }

  get newestVersionInfo() {
    if (this._history.length <= 0) {
      throw new Error('history array is empty.')
    }

    return this._history[0]
  }

  get oldestVersionInfo() {
    if (this._history.length <= 0) {
      throw new Error('history array is empty.')
    }

    return this._history[this._history.length - 1]
  }
}
