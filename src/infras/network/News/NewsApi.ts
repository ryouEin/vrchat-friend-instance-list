import { INewsApi } from '@/infras/network/News/INewsApi'
import { NewsJson } from '@/types/News'
import axios from 'axios'
import { NEWS_API_KEY, NEWS_API_URL } from '@/config/env'
import { UnixTime } from '@/types/UnixTime'
import { convertUnixTimeToISO8601ExtendedUTC } from '@/shame/convertUnixTimeToISO8601ExtendedUTC'

type NewsApiResponse = {
  contents: {
    title: string
    content: string
    publishedAt: string
  }[]
}

export default class NewsApi implements INewsApi {
  async fetchNewsSince(unixTime: UnixTime): Promise<NewsJson[]> {
    const sinceString = convertUnixTimeToISO8601ExtendedUTC(unixTime)
    const response = await axios.get<NewsApiResponse>(NEWS_API_URL, {
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
