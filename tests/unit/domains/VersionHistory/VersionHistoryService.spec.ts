import { VersionHistoryService } from '@/domains/VersionHistory/VersionHistoryService'

describe('versionAIsNewerThanB', () => {
  it('AがBより新しい際にtrueを返却', () => {
    const result = VersionHistoryService.versionAIsNewerThanB('0.0.1', '0.0.0')

    expect(result).toBe(true)
  })

  it('AとBが同じバージョンの際にfalseを返却', () => {
    const result = VersionHistoryService.versionAIsNewerThanB('0.0.1', '0.0.1')

    expect(result).toBe(false)
  })

  it('AがBより古い際にfalseを返却', () => {
    const result = VersionHistoryService.versionAIsNewerThanB('0.0.1', '0.1.0')

    expect(result).toBe(false)
  })
})

describe('versionHistoryJsonAIsNewerThanB', () => {
  it('Aの最新がBの最新より新しい際にtrueを返却', () => {
    const result = VersionHistoryService.versionHistoryJsonAIsNewerThanB(
      [
        {
          version: '0.0.0',
          contents: [],
        },
        {
          version: '0.0.1',
          contents: [],
        },
      ],
      [
        {
          version: '0.0.0',
          contents: [],
        },
      ]
    )

    expect(result).toBe(true)
  })

  it('Aの最新とBの最新が同じバージョンの際にfalseを返却', () => {
    const result = VersionHistoryService.versionHistoryJsonAIsNewerThanB(
      [
        {
          version: '0.0.0',
          contents: [],
        },
        {
          version: '0.0.1',
          contents: [],
        },
      ],
      [
        {
          version: '0.0.0',
          contents: [],
        },
        {
          version: '0.0.1',
          contents: [],
        },
      ]
    )

    expect(result).toBe(false)
  })

  it('Aの最新がBの最新より古い際にfalseを返却', () => {
    const result = VersionHistoryService.versionHistoryJsonAIsNewerThanB(
      [
        {
          version: '0.0.0',
          contents: [],
        },
      ],
      [
        {
          version: '0.0.0',
          contents: [],
        },
        {
          version: '0.0.1',
          contents: [],
        },
      ]
    )

    expect(result).toBe(false)
  })
})
