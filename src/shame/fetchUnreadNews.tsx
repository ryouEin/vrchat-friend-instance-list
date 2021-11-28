import { ILastCheckNewsAt } from '../repositories/News/ILastCheckNewsAt'
import { INewsRepository } from '../repositories/News/INewsRepository'
import { MSecUnixTime } from '../types'

const NEWS_COUNT = 3

export const fetchUnreadNews = async (
  lastCheckAt: MSecUnixTime,
  newsRepository: INewsRepository
) => {
  const newsJsonArray = await newsRepository.fetchNewsSince(lastCheckAt)

  return newsJsonArray
    .sort((a, b) => {
      return a.publishedAt > b.publishedAt ? -1 : 1
    })
    .slice(0, NEWS_COUNT)
}
