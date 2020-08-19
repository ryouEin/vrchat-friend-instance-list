import { INetwork, NetworkOptions } from '@/libs/Network/INetwork'
import NetworkNewsRepository from '@/infras/News/NetworkNewsRepository'

class MockNetwork implements INetwork {
  constructor(public response: any) {}

  async get(url: string, options?: NetworkOptions): Promise<unknown> {
    return this.response
  }
}

describe('fetchNewsSince', () => {
  it('お知らせがNewsの配列形式で取得出来る', async () => {
    const mockNetwork = new MockNetwork({
      contents: [
        {
          id: 'lfh9oc6vq',
          createdAt: '2020-08-13T15:19:23.400Z',
          updatedAt: '2020-08-13T15:19:23.400Z',
          publishedAt: '2020-08-13T15:19:23.400Z',
          title: 'サンプルタイトル',
          content: 'サンプルコンテンツ',
        },
      ],
      totalCount: 1,
      offset: 0,
      limit: 10,
    })
    const networkNewsRepository = new NetworkNewsRepository(mockNetwork)

    // TODO: リクエスト内容に関するテストも必要か？
    const result = await networkNewsRepository.fetchNewsSince(219847145)

    expect(result).toEqual([
      {
        title: 'サンプルタイトル',
        content: 'サンプルコンテンツ',
        publishedAt: 1597331963400,
      },
    ])
  })
})
