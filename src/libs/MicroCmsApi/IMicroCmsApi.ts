import { NewsApiResponse } from '../../types/ApiResponse'

export type ComparisonMethod =
  | 'equals'
  | 'not_equals'
  | 'less_than'
  | 'greater_than'
  | 'contains'
  | 'exists'
  | 'not_exists'
  | 'begins_with'

export type Filter = {
  key: string
  comparisonMethod: ComparisonMethod
  value?: string
}

export type ListNewsOptions = {
  filters?: Filter
}

export interface IMicroCmsApi {
  listNews(options: ListNewsOptions): Promise<NewsApiResponse>
}
