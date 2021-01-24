import { News } from '@/types'

export interface INewsRepository {
  fetchUnreadNews(count: number): Promise<News[]>
}
