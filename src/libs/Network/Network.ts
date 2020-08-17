import axios, { AxiosAdapter } from 'axios'
import { throttleAdapterEnhancer, cacheAdapterEnhancer } from 'axios-extensions'
import { INetwork, Params } from '@/libs/Network/INetwork'

const adapter = axios.defaults.adapter
if (adapter === undefined) {
  throw new Error('axios adapter is undefined.')
}
// TODO SOON: 使用側でthrottleの時間を設定できるようにしたい
const throttleAdapter = throttleAdapterEnhancer(adapter, {
  threshold: 10 * 1000,
})

export class Network implements INetwork {
  async get<T>(url: string, params: Params = {}, throttle = false): Promise<T> {
    const config: { params: Params; adapter?: AxiosAdapter } = {
      params,
    }

    if (throttle) config.adapter = throttleAdapter

    const response = await axios.get<T>(url, config)

    return response.data
  }
}
