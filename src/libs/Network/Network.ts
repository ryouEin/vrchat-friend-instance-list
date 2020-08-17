import axios from 'axios'
import { INetwork } from '@/libs/Network/INetwork'

export class Network implements INetwork {
  async get<T>(
    url: string,
    params?: { [p: string]: number | string | boolean }
  ): Promise<T> {
    const response = await axios.get<T>(url, { params })

    return response.data
  }
}
