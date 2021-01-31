import MicroCmsApiNewsRepository from './MicroCmsApiNewsRepository'
import { ILastCheckNewsAt } from './ILastCheckNewsAt'
import { MSecUnixTime } from '../../types'
import {
  IMicroCmsApi,
  ListNewsOptions,
} from '../../libs/MicroCmsApi/IMicroCmsApi'
import { NewsApiResponse } from '../../types/ApiResponse'
import { advanceTo } from 'jest-date-mock'

class MockLastCheckNewsAt implements ILastCheckNewsAt {
  public lastCheckNewsAt: MSecUnixTime | undefined = undefined

  setLastCheckNewsAt(unixtime: MSecUnixTime) {
    this.lastCheckNewsAt = unixtime
  }

  getLastCheckNewsAt(): MSecUnixTime | undefined {
    return this.lastCheckNewsAt
  }
}

class MockMicroCmsApi implements IMicroCmsApi {
  public news: NewsApiResponse = { contents: [] }

  async listNews(options: ListNewsOptions): Promise<NewsApiResponse> {
    return this.news
  }
}

describe('fetchUnreadNews', () => {
  it('ニュースを新しいものから3件取得し、現在時刻がストレージに保存される', async () => {
    const currentDateString = '2020-08-14T15:19:23.400Z'
    const currentDateUnixTime = new Date(currentDateString).getTime()
    advanceTo(currentDateUnixTime)

    const lastCheckNewsAt = new MockLastCheckNewsAt()
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
    const news04 = {
      title: 'news04',
      content: 'news04',
      publishedAt: '2020-08-10T15:19:23.400Z',
    }
    microCmsApi.news = {
      contents: [news03, news02, news04, news01],
    }

    const repository = new MicroCmsApiNewsRepository(
      lastCheckNewsAt,
      microCmsApi
    )
    const result = await repository.fetchUnreadNews()

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
    expect(lastCheckNewsAt.lastCheckNewsAt).toBe(currentDateUnixTime)
  })

  it('最終ニュース確認日時以降のデータしか取得しない', async () => {
    const currentDateString = '2020-08-15T10:19:23.400Z'
    const currentDateUnixTime = new Date(currentDateString).getTime()
    advanceTo(currentDateUnixTime)

    const lastCheckNewsAt = new MockLastCheckNewsAt()
    lastCheckNewsAt.lastCheckNewsAt = new Date(
      '2020-08-12T10:19:23.400Z'
    ).getTime()

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
    const news04 = {
      title: 'news04',
      content: 'news04',
      publishedAt: '2020-08-10T15:19:23.400Z',
    }
    microCmsApi.news = {
      contents: [news03, news02, news04, news01],
    }

    const repository = new MicroCmsApiNewsRepository(
      lastCheckNewsAt,
      microCmsApi
    )
    const result = await repository.fetchUnreadNews()

    expect(result).toEqual([
      {
        ...news01,
        publishedAt: news01UnixTime,
      },
      {
        ...news02,
        publishedAt: news02UnixTime,
      },
    ])
    expect(lastCheckNewsAt.lastCheckNewsAt).toBe(currentDateUnixTime)
  })
})
