import Storage from '@/libs/Storage/Storage'
import { VersionHistoryJson } from '@/types/VersionHistoryJson'

const storage = new Storage()
const KEY = 'confirmedVersionHistory'

export const VersionHistoryStorage = {
  get() {
    const jsonString = storage.getItem(KEY)
    if (jsonString === undefined) {
      return undefined
    }

    return JSON.parse(jsonString)
  },

  set(versionHistoryJson: VersionHistoryJson) {
    storage.setItem(KEY, JSON.stringify(versionHistoryJson))
  },
}
