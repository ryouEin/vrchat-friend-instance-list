import {
  IMicroCmsApi,
  ListNewsOptions,
} from '../../libs/MicroCmsApi/IMicroCmsApi'
import { NewsApiResponse } from '../../types/ApiResponse'
import MicroCmsApiNewsRepository from './MicroCmsApiNewsRepository'

class MockMicroCmsApi implements IMicroCmsApi {
  public news: NewsApiResponse = { contents: [] }

  async listNews(options: ListNewsOptions): Promise<NewsApiResponse> {
    return this.news
  }
}

describe('fetchNewsSince', () => {
  // TODO: listNewsが正当な引数で呼ばれている事を確認
  it('記事のpublished_atがUnixTime(ミリ秒)に変換されて返却される', async () => {
    const microCmsApi = new MockMicroCmsApi()

    const news01 = {
      title: 'news01',
      content: 'news01',
      publishedAt: '2020-08-13T15:19:23.400Z',
    }
    const news01UnixTime = new Date(news01.publishedAt).getTime()
    const news02 = {
      title: 'news02',
      content: 'news02',
      publishedAt: '2020-08-12T15:19:23.400Z',
    }
    const news02UnixTime = new Date(news02.publishedAt).getTime()
    const news03 = {
      title: 'news03',
      content: 'news03',
      publishedAt: '2020-08-11T15:19:23.400Z',
    }
    const news03UnixTime = new Date(news03.publishedAt).getTime()
    microCmsApi.news = {
      contents: [news01, news02, news03],
    }

    const repository = new MicroCmsApiNewsRepository(microCmsApi)
    const result = await repository.fetchNewsSince(0)

    expect(result).toEqual([
      {
        ...news01,
        publishedAt: news01UnixTime,
      },
      {
        ...news02,
        publishedAt: news02UnixTime,
      },
      {
        ...news03,
        publishedAt: news03UnixTime,
      },
    ])
  })
})
