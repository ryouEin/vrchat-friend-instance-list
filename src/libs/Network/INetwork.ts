export interface INetwork {
  get<T>(
    url: string,
    params?: { [key: string]: number | string | boolean }
  ): Promise<T>
}
