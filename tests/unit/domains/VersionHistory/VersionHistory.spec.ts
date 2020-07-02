import { VersionHistoryFactory } from '@/domains/VersionHistory/VersionHistoryFactory'
import { VersionInfo } from '@/domains/VersionHistory/VersionInfo'
import { Version } from '@/domains/VersionHistory/Version'

describe('newestVersionInfo', () => {
  it('最新のVersionInfoを返却する', () => {
    const versionHistory = VersionHistoryFactory.create([
      {
        version: '0.0.0',
        contents: ['a'],
      },
      {
        version: '0.0.2',
        contents: ['b'],
      },
      {
        version: '0.0.1',
        contents: ['c'],
      },
    ])

    const result = versionHistory.newestVersionInfo

    expect(result).toEqual(new VersionInfo(new Version('0.0.2'), ['b']))
  })
})

describe('oldestVersionInfo', () => {
  it('最古のVersionInfoを返却する', () => {
    const versionHistory = VersionHistoryFactory.create([
      {
        version: '0.0.0',
        contents: ['a'],
      },
      {
        version: '0.0.2',
        contents: ['b'],
      },
      {
        version: '0.0.1',
        contents: ['c'],
      },
    ])

    const result = versionHistory.oldestVersionInfo

    expect(result).toEqual(new VersionInfo(new Version('0.0.0'), ['a']))
  })
})
