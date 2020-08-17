export type Params = { [key: string]: number | string | boolean }
export interface INetwork {
  get<T>(url: string, params?: Params, throttle?: boolean): Promise<T>
}
