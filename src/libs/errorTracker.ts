import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

class ErrorTracker {
  private ignoreMessages: string[] = []

  constructor() {
    Sentry.init({
      dsn:
        'https://828ea2de6f3b4ba08ea3606d69d97b9a@o476585.ingest.sentry.io/5516530',
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }

  setIgnoreMessage(message: string) {
    this.ignoreMessages.push(message)
  }

  sendErrorLog(error: Error) {
    if (this.ignoreMessages.includes(error.message)) return

    Sentry.captureException(error)
  }
}

const errorTracker = new ErrorTracker()

// 特に問題のあるエラーではない。ノイズになるので除外
// https://github.com/ryouEin/vrchat-friend-instance-list/issues/110
errorTracker.setIgnoreMessage(
  'ResizeObserver loop completed with undelivered notifications.'
)

export { errorTracker }
