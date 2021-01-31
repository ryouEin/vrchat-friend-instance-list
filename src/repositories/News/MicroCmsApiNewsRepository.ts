import { INewsRepository } from './INewsRepository'
import { MSecUnixTime } from '../../types'
import { IMicroCmsApi } from '../../libs/MicroCmsApi/IMicroCmsApi'
import { convertUnixTimeToISO8601ExtendedUTC } from '../../libs/Utils'
import { ILastCheckNewsAt } from './ILastCheckNewsAt'
import { News } from '../../presentations/types'

const DEFAULT_NEWS_COUNT = 3

export default class MicroCmsApiNewsRepository implements INewsRepository {
  constructor(
    private readonly _lastCheckNewsAt: ILastCheckNewsAt,
    private readonly _newsApi: IMicroCmsApi
  ) {}

  private async fetchNewsSince(unixTime: MSecUnixTime): Promise<News[]> {
    const sinceString = convertUnixTimeToISO8601ExtendedUTC(unixTime)
    const response = await this._newsApi.listNews({
      filters: {
        key: 'publishedAt',
        comparisonMethod: 'greater_than',
        value: sinceString,
      },
    })

    return response.contents.map((item) => {
      return {
        title: item.title,
        content: item.content,
        publishedAt: new Date(item.publishedAt).getTime(),
      }
    })
  }

  async fetchUnreadNews(count: number = DEFAULT_NEWS_COUNT) {
    const lastCheckAt = this._lastCheckNewsAt.getLastCheckNewsAt() ?? 0
    const newsJsonArray = await this.fetchNewsSince(lastCheckAt)

    this._lastCheckNewsAt.setLastCheckNewsAt(Date.now())

    if (lastCheckAt === undefined) {
      return newsJsonArray
    }

    return newsJsonArray
      .filter((item) => item.publishedAt > lastCheckAt)
      .sort((a, b) => {
        return a.publishedAt > b.publishedAt ? -1 : 1
      })
      .slice(0, count)
  }
}
