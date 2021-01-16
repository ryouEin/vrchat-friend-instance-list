import Vue from 'vue'
import * as Sentry from '@sentry/browser'

type OnErrorCallback = (error: Error) => Error | null
class UnhandledErrorHandler {
  private onErrorCallback?: OnErrorCallback = undefined

  constructor() {
    this.init()
  }

  setOnErrorCallback(callback: OnErrorCallback) {
    this.onErrorCallback = callback
  }

  init() {
    // 全てのエラーをキャプチャするには以下の3パターン登録する必要がある
    // https://qiita.com/clomie/items/73fa1e9f61e5b88826bc
    Vue.config.errorHandler = error => {
      this.errorHandler(error)
    }
    window.addEventListener('error', event => {
      const error: Error = ((event: ErrorEvent) => {
        if (event.error instanceof Error) {
          return event.error
        }
        if (event.message) {
          return new Error(event.message)
        }

        return new Error('onerror with no message')
      })(event)
      this.errorHandler(error)
    })
    window.addEventListener('unhandledrejection', event => {
      this.errorHandler(event.reason)
    })
  }

  errorHandler(error: unknown) {
    if (!(error instanceof Error)) {
      throw new Error('none error object past to errorHandler')
    }

    if (this.onErrorCallback !== undefined) {
      const result = this.onErrorCallback(error)
      if (result !== null) this.reportError(result)
    } else {
      this.reportError(error)
    }
  }

  reportError(error: Error) {
    Sentry.captureException(error)
  }
}

export const unhandledErrorHandler = new UnhandledErrorHandler()
