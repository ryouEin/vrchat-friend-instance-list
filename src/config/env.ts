const loadEnv = (key: string) => {
  const envValue = process.env[key]
  if (envValue === undefined) {
    throw new Error(`env ${key} is undefined.`)
  }

  return envValue
}

export const VRC_API_URL = loadEnv('VUE_APP_VRC_API_URL')

export const NEWS_API_URL = loadEnv('VUE_APP_NEWS_API_URL')

export const NEWS_API_KEY = loadEnv('VUE_APP_NEWS_API_KEY')
