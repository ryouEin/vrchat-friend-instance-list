import { News } from '../../presentations/types'

export interface INewsRepository {
  fetchUnreadNews(count: number): Promise<News[]>
}
