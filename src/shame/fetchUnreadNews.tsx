import { ILastCheckNewsAt } from '../repositories/News/ILastCheckNewsAt'
import { INewsRepository } from '../repositories/News/INewsRepository'

const NEWS_COUNT = 3

export const fetchUnreadNews = async (
  lastCheckNewsAtRepository: ILastCheckNewsAt,
  newsRepository: INewsRepository
) => {
  const lastCheckAt =
    lastCheckNewsAtRepository.getLastCheckNewsAt() ?? Date.now()
  const newsJsonArray = await newsRepository.fetchNewsSince(lastCheckAt)

  return newsJsonArray
    .filter((item) => item.publishedAt > lastCheckAt)
    .sort((a, b) => {
      return a.publishedAt > b.publishedAt ? -1 : 1
    })
    .slice(0, NEWS_COUNT)
}
