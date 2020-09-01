// 以下を参考にした
// https://qiita.com/shibukawa/items/ffe7264ecff78f55b296
export abstract class BaseError<T> extends Error {
  protected constructor(e?: string) {
    super(e)

    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }

  abstract get details(): T
}
