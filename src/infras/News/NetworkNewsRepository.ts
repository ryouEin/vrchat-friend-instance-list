import { INewsRepository } from '@/infras/News/INewsRepository'
import { NEWS_API_KEY, NEWS_API_URL } from '@/config/env'
import { convertUnixTimeToISO8601ExtendedUTC } from '@/shame/convertUnixTimeToISO8601ExtendedUTC'
import { News, UnixTime } from '@/types'
import { INetwork } from '@/libs/Network/INetwork'
import { NewsApiResponse } from '@/types/ApiResponse'

export default class NetworkNewsRepository implements INewsRepository {
  constructor(private readonly _network: INetwork) {}

  async fetchNewsSince(unixTime: UnixTime): Promise<News[]> {
    const sinceString = convertUnixTimeToISO8601ExtendedUTC(unixTime)
    const response = await this._network.get(NEWS_API_URL, {
      params: {
        filters: `publishedAt[greater_than]${sinceString}`,
      },
      headers: {
        'X-API-KEY': NEWS_API_KEY,
      },
    })

    // TODO SOON: Networkから取得したデータのバリデーションして型アサーション外す
    return (response as NewsApiResponse).contents.map(item => {
      return {
        title: item.title,
        content: item.content,
        publishedAt: new Date(item.publishedAt).getTime(),
      }
    })
  }
}
