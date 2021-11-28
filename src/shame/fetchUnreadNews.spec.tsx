import { News } from '../presentations/types'
import { ILastCheckNewsAt } from '../repositories/News/ILastCheckNewsAt'
import { INewsRepository } from '../repositories/News/INewsRepository'
import { MSecUnixTime } from '../types'
import { fetchUnreadNews } from './fetchUnreadNews'

class MockLastCheckNewsAt implements ILastCheckNewsAt {
  public lastCheckNewsAt: MSecUnixTime | undefined = undefined

  setLastCheckNewsAt(unixtime: MSecUnixTime) {
    this.lastCheckNewsAt = unixtime
  }

  getLastCheckNewsAt(): MSecUnixTime | undefined {
    return this.lastCheckNewsAt
  }
}

class MockNewsRepository implements INewsRepository {
  public news: News[] = []

  async fetchNewsSince(since: MSecUnixTime): Promise<News[]> {
    return this.news
  }
}

describe('fetchUnreadNews', () => {
  // TODO: fetchNewsSinceを正しい引数で読んでいることをテスト
  it('ニュースを新しいものから3件取得する', async () => {
    const lastCheckNewsAt = new MockLastCheckNewsAt()
    lastCheckNewsAt.lastCheckNewsAt = new Date(
      '2020-08-05T15:19:23.400Z'
    ).getTime()
    const newsRepository = new MockNewsRepository()

    const news01 = {
      title: 'news01',
      content: 'news01',
      publishedAt: new Date('2020-08-13T15:19:23.400Z').getTime(),
    }
    const news02 = {
      title: 'news02',
      content: 'news02',
      publishedAt: new Date('2020-08-12T15:19:23.400Z').getTime(),
    }
    const news03 = {
      title: 'news03',
      content: 'news03',
      publishedAt: new Date('2020-08-11T15:19:23.400Z').getTime(),
    }
    const news04 = {
      title: 'news04',
      content: 'news04',
      publishedAt: new Date('2020-08-10T15:19:23.400Z').getTime(),
    }
    newsRepository.news = [news01, news02, news03, news04]

    const result = await fetchUnreadNews(0, newsRepository)

    expect(result).toEqual([news01, news02, news03])
  })
})
