import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

class ErrorTracker {
  constructor() {
    Sentry.init({
      dsn:
        'https://828ea2de6f3b4ba08ea3606d69d97b9a@o476585.ingest.sentry.io/5516530',
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  }

  sendErrorLog(error: any) {
    Sentry.captureException(error)
  }
}

export const errorTracker = new ErrorTracker()
