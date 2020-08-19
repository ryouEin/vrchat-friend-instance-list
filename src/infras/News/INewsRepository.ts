import { News, UnixTime } from '@/types'

export interface INewsRepository {
  fetchNewsSince(unixTime: UnixTime): Promise<News[]>
}
