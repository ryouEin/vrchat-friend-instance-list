import { developmentEnv } from './development'
import { productionEnv } from './production'

export type Env = {
  VRC_API_URL: string
  NEWS_API_URL: string
  NEWS_API_KEY: string
  SEND_ERROR_LOG: boolean
}

export const ENVIRONMENT =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'

export const { VRC_API_URL, NEWS_API_URL, NEWS_API_KEY, SEND_ERROR_LOG } =
  ENVIRONMENT === 'production' ? productionEnv : developmentEnv
