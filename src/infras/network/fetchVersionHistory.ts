import { Base64 } from 'js-base64'
import axios from 'axios'
import { CURRENT_VERSION_JSON_URL, NEWEST_VERSION_JSON_URL } from '@/config/env'

export const fetchNewestVersionHistory = async () => {
  const response = await axios.get(NEWEST_VERSION_JSON_URL)

  return JSON.parse(Base64.decode(response.data.content))
}

export const fetchCurrentVersionHistory = async () => {
  const response = await axios.get(CURRENT_VERSION_JSON_URL)

  return response.data
}
