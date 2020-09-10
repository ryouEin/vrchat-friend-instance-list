import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig } from 'axios'
import { throttleAdapterEnhancer } from 'axios-extensions'
import { INetwork, NetworkOptions, Params } from '@/libs/Network/INetwork'
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

  private async exec(config: AxiosRequestConfig): Promise<unknown> {
    const response = await this._client(config)
    return response.data
  }

  // TODO SOON: 各メソッドのAxiosRequestConfigオブジェクトの生成処理は共通化できそう
  async get(url: string, options: NetworkOptions = {}): Promise<unknown> {
    return await this.exec({
      url,
      method: 'get',
      params: options.params ?? {},
      headers: options.headers,
      adapter: options.throttle ? this._throttleAdapter : undefined,
    })
  }

  async post(
    url: string,
    data: Params,
    options: NetworkOptions = {}
  ): Promise<unknown> {
    return await this.exec({
      url,
      method: 'post',
      data,
      params: options.params ?? {},
      headers: options.headers,
      adapter: options.throttle ? this._throttleAdapter : undefined,
    })
  }

  async put(
    url: string,
    data: Params,
    options: NetworkOptions = {}
  ): Promise<unknown> {
    return await this.exec({
      url,
      method: 'put',
      data,
      params: options.params ?? {},
      headers: options.headers,
      adapter: options.throttle ? this._throttleAdapter : undefined,
    })
  }

  async delete(url: string, options: NetworkOptions = {}): Promise<unknown> {
    return await this.exec({
      url,
      method: 'delete',
      params: options.params ?? {},
      headers: options.headers,
      adapter: options.throttle ? this._throttleAdapter : undefined,
    })
  }
}
