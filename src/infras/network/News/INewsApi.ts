import { News, UnixTime } from '@/types'

export interface INewsApi {
  fetchNewsSince(unixTime: UnixTime): Promise<News[]>
}
