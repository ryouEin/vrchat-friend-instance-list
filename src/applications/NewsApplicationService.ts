import { INewsApi } from '@/infras/network/News/INewsApi'
import { INewsStorage } from '@/infras/storage/News/INewsStorage'
import { News } from '@/types'

export class NewsApplicationService {
  constructor(
    private readonly _newsApi: INewsApi,
    private readonly _newsStorage: INewsStorage
  ) {}

  async getNews(): Promise<News[]> {
    const NEWS_COUNT = 3
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
      .slice(0, NEWS_COUNT)
  }
}
