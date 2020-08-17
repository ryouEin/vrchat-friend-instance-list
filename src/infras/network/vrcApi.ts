import axios from 'axios'
import { Favorite, InstanceInfo, User, World } from '@/types/ApiResponse'
import { VRC_API_URL } from '@/config/env'
import { InstanceLocation } from '@/types'

export type ApiServiceErrorCallback = (status: number) => void

const instance = axios.create({
  baseURL: VRC_API_URL,
})
const errorCallbacks: ApiServiceErrorCallback[] = []
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    errorCallbacks.forEach(callback => callback(error.response.status))

    return Promise.reject(error)
  }
)

export const addErrorCallback: (
  handler: ApiServiceErrorCallback
) => void = handler => {
  errorCallbacks.push(handler)
}

// TODO: モックのために型定義したがこれでいいのか？
export type FetchFriendsFunction = (page: number) => Promise<User[]>
export const fetchFriends: FetchFriendsFunction = async page => {
  const COUNT_PER_PAGE = 100
  const response = await instance.get('/api/1/auth/user/friends', {
    params: {
      n: COUNT_PER_PAGE,
      offset: COUNT_PER_PAGE * page,
    },
  })

  return response.data
}

export const fetchFavoriteFriends: () => Promise<Favorite[]> = async () => {
  const response = await instance.get('/api/1/favorites', {
    params: {
      type: 'friend',
      n: 100,
    },
  })

  return response.data
}

export const fetchInstanceInfo: (
  location: InstanceLocation
) => Promise<InstanceInfo> = async location => {
  const response = await instance.get(`/api/1/instances/${location}`)

  return response.data
}
