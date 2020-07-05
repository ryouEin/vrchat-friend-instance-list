import { UnixTime } from '@/types/UnixTime'

export interface NewsJson {
  title: string
  content: string
  publishedAt: UnixTime
}

export interface News {
  title: string
  content: string
}
