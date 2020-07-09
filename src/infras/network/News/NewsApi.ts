import { INewsApi } from '@/infras/network/News/INewsApi'
import axios from 'axios'
import { NEWS_API_KEY, NEWS_API_URL } from '@/config/env'
import { convertUnixTimeToISO8601ExtendedUTC } from '@/shame/convertUnixTimeToISO8601ExtendedUTC'
import * as ApiResponse from '@/types/ApiResponse'
import { News, UnixTime } from '@/types'

export default class NewsApi implements INewsApi {
  async fetchNewsSince(unixTime: UnixTime): Promise<News[]> {
    const sinceString = convertUnixTimeToISO8601ExtendedUTC(unixTime)
    const response = await axios.get<ApiResponse.News>(NEWS_API_URL, {
      params: {
        filters: `publishedAt[greater_than]${sinceString}`,
      },
      headers: {
        'X-API-KEY': NEWS_API_KEY,
      },
    })

    return response.data.contents.map(item => {
      return {
        ...item,
        publishedAt: new Date(item.publishedAt).getTime(),
      }
    })
  }
}
