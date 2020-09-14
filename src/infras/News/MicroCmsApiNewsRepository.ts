import { INewsRepository } from '@/infras/News/INewsRepository'
import { News, UnixTime } from '@/types'
import { IMicroCmsApi } from '@/libs/MicroCmsApi/IMicroCmsApi'
import { convertUnixTimeToISO8601ExtendedUTC } from '@/libs/Utils'

export default class MicroCmsApiNewsRepository implements INewsRepository {
  constructor(private readonly _newsApi: IMicroCmsApi) {}

  async fetchNewsSince(unixTime: UnixTime): Promise<News[]> {
    const sinceString = convertUnixTimeToISO8601ExtendedUTC(unixTime)
    const response = await this._newsApi.listNews({
      filters: {
        key: 'publishedAt',
        comparisonMethod: 'greater_than',
        value: sinceString,
      },
    })

    return response.contents.map(item => {
      return {
        title: item.title,
        content: item.content,
        publishedAt: new Date(item.publishedAt).getTime(),
      }
    })
  }
}
