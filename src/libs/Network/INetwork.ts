export type Params = { [key: string]: number | string | boolean | undefined }
export type NetworkOptions = {
  params?: Params
  throttle?: boolean
  headers?: { [key: string]: string }
}
export interface INetwork {
  get(url: string, options?: NetworkOptions): Promise<unknown>

  post(
    url: string,
    data: { [key: string]: string },
    options?: NetworkOptions
  ): Promise<unknown>
}
