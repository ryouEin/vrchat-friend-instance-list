import { Env } from '.'

export const developmentEnv: Env = {
  VRC_API_URL: 'http://localhost:3000',
  NEWS_API_URL: 'http://localhost:3000/news',
  NEWS_API_KEY: 'apikey',
  SEND_ERROR_LOG: false,
}
