import { News } from '../../presentations/types'
import { MSecUnixTime } from '../../types'

export interface INewsRepository {
  fetchNewsSince(unixTime: MSecUnixTime): Promise<News[]>
}
