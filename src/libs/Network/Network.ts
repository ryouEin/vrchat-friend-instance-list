import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig } from 'axios'
import { throttleAdapterEnhancer } from 'axios-extensions'
import { INetwork, NetworkOptions, Params } from './INetwork'
import { BaseError } from '../BaseError'

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
      (config) => config,
      (error) => {
        return Promise.reject(error)
      }
    )

    this._client.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(
          new NetworkError(error.response?.status, error.message)
        )
      }
    )
  }

  private async exec(config: AxiosRequestConfig): Promise<unknown> {
    const response = await this._client(config)
    return response.data
  }

  // TODO: いい引数名が思い浮かばなかった…そのうち再考
  private buildRequestConfig(arg: {
    url: string
    method: 'get' | 'post' | 'put' | 'delete'
    options?: NetworkOptions
    data?: Params
  }) {
    return {
      url: arg.url,
      method: arg.method,
      params: arg.options?.params ?? {},
      headers: arg.options?.headers,
      adapter: arg.options?.throttle ? this._throttleAdapter : undefined,
      data: arg.data,
    }
  }

  async get(url: string, options: NetworkOptions = {}): Promise<unknown> {
    return await this.exec(
      this.buildRequestConfig({
        url,
        method: 'get',
        options,
      })
    )
  }

  async post(
    url: string,
    data: Params,
    options: NetworkOptions = {}
  ): Promise<unknown> {
    return await this.exec(
      this.buildRequestConfig({
        url,
        method: 'post',
        options,
        data,
      })
    )
  }

  async put(
    url: string,
    data: Params,
    options: NetworkOptions = {}
  ): Promise<unknown> {
    return await this.exec(
      this.buildRequestConfig({
        url,
        method: 'put',
        options,
        data,
      })
    )
  }

  async delete(url: string, options: NetworkOptions = {}): Promise<unknown> {
    return await this.exec(
      this.buildRequestConfig({
        url,
        method: 'delete',
        options,
      })
    )
  }
}
