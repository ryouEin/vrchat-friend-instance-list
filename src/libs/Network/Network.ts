import axios, { AxiosAdapter } from 'axios'
import { throttleAdapterEnhancer } from 'axios-extensions'
import { INetwork, NetworkOptions, Params } from '@/libs/Network/INetwork'

const adapter = axios.defaults.adapter
if (adapter === undefined) {
  throw new Error('axios adapter is undefined.')
}
// TODO SOON: 使用側でthrottleの時間を設定できるようにしたい
const throttleAdapter = throttleAdapterEnhancer(adapter, {
  threshold: 10 * 1000,
})

export class Network implements INetwork {
  async get(url: string, options: NetworkOptions = {}): Promise<unknown> {
    const config: { params: Params; adapter?: AxiosAdapter } = {
      params: options.params ?? {},
    }

    if (options.throttle) config.adapter = throttleAdapter

    const response = await axios.get(url, config)

    return response.data
  }
}
