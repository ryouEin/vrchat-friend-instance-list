export type Params = {
  [key: string]: number | string | boolean | undefined | any[]
}
export type NetworkOptions = {
  params?: Params
  throttle?: boolean
  headers?: { [key: string]: string }
}
export interface INetwork {
  get(url: string, options?: NetworkOptions): Promise<unknown>

  post(url: string, data: Params, options?: NetworkOptions): Promise<unknown>

  put(url: string, data: Params, options?: NetworkOptions): Promise<unknown>

  delete(url: string, options?: NetworkOptions): Promise<unknown>
}
