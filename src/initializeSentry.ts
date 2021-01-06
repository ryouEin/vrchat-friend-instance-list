import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { Event } from '@sentry/browser'

const isResizeObserverLoopCompletedWithUndeliveredNotificationsError = (
  event: Event
) => {
  if (event.exception === undefined) return false
  if (event.exception.values === undefined) return false

  const expectedErrorMessage =
    'ResizeObserver loop completed with undelivered notifications.'
  const eventHasExpectedErrorMessage =
    event.exception.values.find(item => item.value === expectedErrorMessage) !==
    undefined
  if (eventHasExpectedErrorMessage) {
    return true
  }

  return false
}

export const initializeSentry = () => {
  Sentry.init({
    dsn:
      'https://828ea2de6f3b4ba08ea3606d69d97b9a@o476585.ingest.sentry.io/5516530',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    beforeSend(event: Event): PromiseLike<Event | null> | Event | null {
      if (
        isResizeObserverLoopCompletedWithUndeliveredNotificationsError(event)
      ) {
        return null
      }

      return event
    },
  })
}
