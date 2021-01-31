import { Filter, IMicroCmsApi, ListNewsOptions } from './IMicroCmsApi'
import { NewsApiResponse } from '../../types/ApiResponse'
import { INetwork, Params } from '../Network/INetwork'
import { NEWS_API_KEY, NEWS_API_URL } from '../../config/env'

export class MicroCmsApi implements IMicroCmsApi {
  constructor(private readonly _network: INetwork) {}

  static buildFiltersString(filters: Filter) {
    let filtersString = `${filters.key}[${filters.comparisonMethod}]`
    if (filters.value !== undefined) {
      filtersString += filters.value
    } else if (
      filters.comparisonMethod !== 'exists' &&
      filters.comparisonMethod !== 'not_exists'
    ) {
      throw new Error(
        'value is required if comparison methods not equal "exists" or "not_exists"'
      )
    }

    return filtersString
  }

  async listNews(options: ListNewsOptions): Promise<NewsApiResponse> {
    const params: Params = {}
    if (options.filters !== undefined) {
      params['filters'] = MicroCmsApi.buildFiltersString(options.filters)
    }

    return (await this._network.get(NEWS_API_URL, {
      params,
      headers: {
        'X-API-KEY': NEWS_API_KEY,
      },
    })) as NewsApiResponse
  }
}
