import { INewsRepository } from '@/infras/News/INewsRepository'
import { INewsLastCheckRepository } from '@/infras/News/INewsLastCheckRepository'

const DEFAULT_NEWS_COUNT = 3

export const fetchUnreadNews = async (
  newsApi: INewsRepository,
  newsStorage: INewsLastCheckRepository,
  count: number = DEFAULT_NEWS_COUNT
) => {
  const lastCheckAt = newsStorage.getLastCheckNewsAt() ?? 0
  const newsJsonArray = await newsApi.fetchNewsSince(lastCheckAt)

  newsStorage.setLastCheckNewsAt(Date.now())

  if (lastCheckAt === undefined) {
    return newsJsonArray
  }

  return newsJsonArray
    .filter(item => item.publishedAt > lastCheckAt)
    .sort((a, b) => {
      return a.publishedAt > b.publishedAt ? -1 : 1
    })
    .slice(0, count)
}
