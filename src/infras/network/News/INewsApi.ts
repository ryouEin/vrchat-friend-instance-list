import { NewsJson } from '@/types/News'
import { UnixTime } from '@/types/UnixTime'

export interface INewsApi {
  fetchNewsSince(unixTime: UnixTime): Promise<NewsJson[]>
}
