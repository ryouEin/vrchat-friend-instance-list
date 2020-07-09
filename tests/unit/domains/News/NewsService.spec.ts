import { INewsStorage } from '@/infras/storage/News/INewsStorage'
import { INewsApi } from '@/infras/network/News/INewsApi'
import { NewsService } from '@/domains/News/NewsService'
import { advanceTo } from 'jest-date-mock'
import { News, UnixTime } from '@/types'

describe('getNews', () => {
  const dummyNewsArray: News[] = [
    {
      title: 'お知らせ3',
      content: 'お知らせ3',
      publishedAt: 1593950123000,
    },
    {
      title: 'お知らせ1',
      content: 'お知らせ1',
      publishedAt: 1593950121000,
    },
    {
      title: 'お知らせ5',
      content: 'お知らせ5',
      publishedAt: 1593950125000,
    },
    {
      title: 'お知らせ2',
      content: 'お知らせ2',
      publishedAt: 1593950122000,
    },
    {
      title: 'お知らせ4',
      content: 'お知らせ4',
      publishedAt: 1593950124000,
    },
  ]
  class MockNewsApi implements INewsApi {
    async fetchNewsSince(unixTime: UnixTime): Promise<News[]> {
      return dummyNewsArray
    }
  }
  class MockNewsStorage implements INewsStorage {
    lastCheckAt = 1593950122500
    setLastCheckNewsAt(unixtime: number): void {
      this.lastCheckAt = unixtime
    }
    getLastCheckNewsAt(): number | undefined {
      return this.lastCheckAt
    }
  }

  it('最終お知らせ確認日時以降のお知らせを最大三件公開日降順で取得する', async () => {
    const newsApi = new MockNewsApi()
    const newsStorage = new MockNewsStorage()
    const newsService = new NewsService(newsApi, newsStorage)
    const result = await newsService.getNews()

    expect(result).toEqual([
      {
        title: 'お知らせ5',
        content: 'お知らせ5',
        publishedAt: 1593950125000,
      },
      {
        title: 'お知らせ4',
        content: 'お知らせ4',
        publishedAt: 1593950124000,
      },
      {
        title: 'お知らせ3',
        content: 'お知らせ3',
        publishedAt: 1593950123000,
      },
    ])
  })

  it('最終お知らせ確認日時が更新される', async () => {
    advanceTo(new Date(2020, 8, 1, 0, 0, 0))

    const newsApi = new MockNewsApi()
    const newsStorage = new MockNewsStorage()
    const newsService = new NewsService(newsApi, newsStorage)
    await newsService.getNews()

    expect(newsStorage.lastCheckAt).toBe(Date.now())
  })
})
