import { useCallback } from 'react'
import { newsRepository } from '../../../factory/repository'
import { MarkdownTextComponent } from '../../components/presentational/MarkdownTextComponent/MarkdownTextComponent'
import { useAlert } from '../../providers/Alerts/useAlert'

export const useNews = () => {
  const { alert } = useAlert()

  const alertUnreadNews = useCallback(async () => {
    const newsList = await newsRepository.fetchUnreadNews()
    newsList.forEach((news) =>
      alert({
        title: news.title,
        contentSlot: <MarkdownTextComponent markdownText={news.content} />,
      })
    )
  }, [alert])

  return {
    alertUnreadNews,
  }
}
