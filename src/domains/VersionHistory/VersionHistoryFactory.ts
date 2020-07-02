import { VersionHistory } from '@/domains/VersionHistory/VersionHistory'
import { VersionHistoryJson } from '@/types/VersionHistoryJson'
import { Version } from '@/domains/VersionHistory/Version'
import { VersionInfo } from '@/domains/VersionHistory/VersionInfo'

export class VersionHistoryFactory {
  static create(versionHistoryJson: VersionHistoryJson): VersionHistory {
    const versionInfoArray = versionHistoryJson.map(versionInfoJson => {
      return new VersionInfo(
        new Version(versionInfoJson.version),
        versionInfoJson.contents
      )
    })

    return new VersionHistory(versionInfoArray)
  }
}
