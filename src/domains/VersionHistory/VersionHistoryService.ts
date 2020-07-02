import { VersionHistoryJson } from '@/types/VersionHistoryJson'
import { Version } from '@/domains/VersionHistory/Version'
import { VersionHistoryFactory } from '@/domains/VersionHistory/VersionHistoryFactory'

export class VersionHistoryService {
  static versionAIsNewerThanB(a: string, b: string) {
    const versionA = new Version(a)
    const versionB = new Version(b)

    return versionA.isNewerThan(versionB)
  }

  static versionHistoryJsonAIsNewerThanB(
    a: VersionHistoryJson,
    b: VersionHistoryJson
  ) {
    const historyA = VersionHistoryFactory.create(a)
    const historyB = VersionHistoryFactory.create(b)

    return historyA.newestVersionInfo.version.isNewerThan(
      historyB.newestVersionInfo.version
    )
  }

  static getNewestVersionInfoJson(versionHistoryJson: VersionHistoryJson) {
    const history = VersionHistoryFactory.create(versionHistoryJson)

    return {
      version: history.newestVersionInfo.version.value,
      contents: history.newestVersionInfo.contents,
    }
  }
}
