import { INewsApi } from '@/infras/News/Api/INewsApi'
import { INewsStorage } from '@/infras/News/Storage/INewsStorage'
import { News } from '@/types'

const DEFAULT_NEWS_COUNT = 3

export class NewsRepository {
  constructor(
    private readonly _newsApi: INewsApi,
    private readonly _newsStorage: INewsStorage
  ) {}

  // TODO: Repositoryで処理をやりすぎではないか？再考の余地あり
  async fetchUnreadNews(count: number = DEFAULT_NEWS_COUNT): Promise<News[]> {
    const lastCheckAt = this._newsStorage.getLastCheckNewsAt() ?? 0
    const newsJsonArray = await this._newsApi.fetchNewsSince(lastCheckAt)

    this._newsStorage.setLastCheckNewsAt(Date.now())

    if (lastCheckAt === undefined) {
      return newsJsonArray
    }

    return newsJsonArray
      .filter(item => item.publishedAt > lastCheckAt)
      .sort((a, b) => {
        return a.publishedAt > b.publishedAt ? -1 : 1
      })
      .slice(0, count)
  }
}
