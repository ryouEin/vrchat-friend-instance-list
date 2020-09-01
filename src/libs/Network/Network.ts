import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig } from 'axios'
import { throttleAdapterEnhancer } from 'axios-extensions'
import { INetwork, NetworkOptions } from '@/libs/Network/INetwork'
import { BaseError } from '@/libs/BaseError'

export class NetworkError extends BaseError<{ status?: number }> {
  constructor(private readonly _status?: number, e?: string) {
    super(e)
  }

  get details() {
    return {
      status: this._status,
    }
  }
}

export class Network implements INetwork {
  private readonly _client: AxiosInstance

  private readonly _throttleAdapter: AxiosAdapter

  constructor() {
    this._client = axios.create()
    const adapter = this._client.defaults.adapter
    if (adapter === undefined) {
      throw new Error('axios adapter is undefined.')
    }

    // TODO: get/postの引数でthrottleの時間を設定できるようにしたい
    this._throttleAdapter = throttleAdapterEnhancer(adapter, {
      threshold: 10 * 1000,
    })

    this._client.interceptors.request.use(
      config => config,
      error => {
        return Promise.reject(error)
      }
    )

    this._client.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(
          new NetworkError(error.response?.status, error.message)
        )
      }
    )
  }

  async get(url: string, options: NetworkOptions = {}): Promise<unknown> {
    const config: AxiosRequestConfig = {
      params: options.params ?? {},
      headers: options.headers,
      adapter: options.throttle ? this._throttleAdapter : undefined,
    }

    const response = await this._client.get(url, config)

    return response.data
  }

  async post(
    url: string,
    data: { [key: string]: string },
    options: NetworkOptions = {}
  ): Promise<unknown> {
    const config: AxiosRequestConfig = {
      params: options.params ?? {},
      headers: options.headers,
      adapter: options.throttle ? this._throttleAdapter : undefined,
    }

    const response = await this._client.post(url, config)

    return response.data
  }
}
