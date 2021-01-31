import { INetwork, NetworkOptions, Params } from '../Network/INetwork'
import { MicroCmsApi } from './MicroCmsApi'

class MockNetwork implements INetwork {
  public beforeOptions!: NetworkOptions
  async get(url: string, options?: NetworkOptions): Promise<unknown> {
    if (options === undefined) throw new Error('options is undefined')
    this.beforeOptions = options

    return
  }

  async post(
    url: string,
    data: { [p: string]: string },
    options?: NetworkOptions
  ): Promise<unknown> {
    return
  }

  async put(
    url: string,
    data: Params,
    options?: NetworkOptions
  ): Promise<unknown> {
    return
  }

  async delete(url: string, options?: NetworkOptions): Promise<unknown> {
    return
  }
}

describe('listNews', () => {
  it('filtersを指定した際に、「{key}[{comparisonMethod}]{value}」というパラメータが付与される', async () => {
    const mockNetwork = new MockNetwork()
    const microCmsApi = new MicroCmsApi(mockNetwork)

    await microCmsApi.listNews({
      filters: {
        key: 'keyString',
        comparisonMethod: 'greater_than',
        value: 'valueString',
      },
    })

    expect(mockNetwork.beforeOptions.params).toEqual({
      filters: 'keyString[greater_than]valueString',
    })
  })

  it('filtersのvalueが必須なcomparisonMethodでvalueを省略された際に例外を吐く', async () => {
    const mockNetwork = new MockNetwork()
    const microCmsApi = new MicroCmsApi(mockNetwork)

    await expect(
      microCmsApi.listNews({
        filters: {
          key: 'keyString',
          comparisonMethod: 'greater_than',
        },
      })
    ).rejects.toThrow()
  })

  it('filtersのvalueが不要なcomparisonMethodではvalueなしで動作する', async () => {
    const mockNetwork = new MockNetwork()
    const microCmsApi = new MicroCmsApi(mockNetwork)

    await microCmsApi.listNews({
      filters: {
        key: 'keyString',
        comparisonMethod: 'exists',
      },
    })

    expect(mockNetwork.beforeOptions.params).toEqual({
      filters: 'keyString[exists]',
    })

    await microCmsApi.listNews({
      filters: {
        key: 'keyString',
        comparisonMethod: 'not_exists',
      },
    })

    expect(mockNetwork.beforeOptions.params).toEqual({
      filters: 'keyString[not_exists]',
    })
  })
})
