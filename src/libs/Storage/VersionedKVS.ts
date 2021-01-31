import { IKeyValueStorage } from './IKeyValueStorage'

type VersionedData<T> = {
  version: string
  data: T
}

type Options<T> = {
  storageKey: string
  version: string
  initialData: () => T
}

/**
 * 以下のようなデータ構造で、versionをキーとしてデータ構造のバージョン管理をするクラス
 * {
 *   version: '2',
 *   data: T
 * }
 *
 * ストレージに保管しているデータのバージョンと期待しているバージョンが異なる際は、getで初期値が返却される。
 * チェックするのはversionの値のみで、dataの構造とかまではチェックしないのでそこはこのクラスを使用する側で担保する必要がある。
 */
export class VersionedKVS<T> {
  constructor(private storage: IKeyValueStorage, private options: Options<T>) {}

  private setData(data: T) {
    const cacheData: VersionedData<T> = {
      version: this.options.version,
      data,
    }
    this.storage.setItem(this.options.storageKey, JSON.stringify(cacheData))
  }

  // 型ガードはany使うのしょうがないので
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isVersionedData(arg: any): arg is VersionedData<T> {
    if (arg === undefined) return false
    if (arg.version === undefined) return false
    if (arg.data === undefined) return false

    return true
  }

  isValidVersion(versionedData: VersionedData<T>) {
    return versionedData.version === this.options.version
  }

  get() {
    const jsonString = this.storage.getItem(this.options.storageKey)
    if (jsonString === undefined) {
      return this.options.initialData()
    }

    const versionedData = JSON.parse(jsonString)
    if (!this.isVersionedData(versionedData)) {
      return this.options.initialData()
    }

    if (!this.isValidVersion(versionedData)) {
      return this.options.initialData()
    }

    return versionedData.data
  }

  set(data: T) {
    this.setData(data)
  }
}
