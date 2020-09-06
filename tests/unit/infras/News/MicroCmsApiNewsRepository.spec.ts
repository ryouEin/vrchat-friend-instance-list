import MicroCmsApiNewsRepository from '@/infras/News/MicroCmsApiNewsRepository'
import { IMicroCmsApi, ListNewsOptions } from '@/libs/MicroCmsApi/IMicroCmsApi'
import { NewsApiResponse } from '@/types/ApiResponse'

class MockNewsApi implements IMicroCmsApi {
  public listNewsResponse?: NewsApiResponse

  async listNews(options: ListNewsOptions): Promise<NewsApiResponse> {
    return this.listNewsResponse ?? { contents: [] }
  }
}

describe('fetchNewsSince', () => {
  it('お知らせがNewsの配列形式で取得出来る', async () => {
    const mockNewsApi = new MockNewsApi()
    // TODO: レスポンス固定だと、
    //  ・APIからレスポンス受け取ったあとの処理が正しいことはテスト出来る
    //  ・APIにリクエスト投げる前の処理が正しいことがテスト出来ない
    //  という問題がある。
    //  ただこれの対応をしようとするとモックを割とガッツリ実装しないといけなくて
    //  工数がかかるので一旦保留
    mockNewsApi.listNewsResponse = {
      contents: [
        {
          publishedAt: '2020-08-13T15:19:23.400Z',
          title: 'サンプルタイトル',
          content: 'サンプルコンテンツ',
        },
      ],
    }
    const networkNewsRepository = new MicroCmsApiNewsRepository(mockNewsApi)

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
