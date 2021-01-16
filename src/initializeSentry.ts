import { VueConstructor } from 'vue'
import * as Sentry from '@sentry/browser'
import { Event } from '@sentry/browser'
import axios from 'axios'

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

const fixStackTraceFileName = () => {
  const normalizeUrl = (url: string) => {
    return url.replace(/(moz|chrome)-extension:\/\/[^/]+\//, '~/')
  }

  Sentry.configureScope(scope => {
    scope.addEventProcessor(async event => {
      if (
        event.exception !== undefined &&
        event.exception.values !== undefined &&
        event.exception.values[0].stacktrace !== undefined &&
        event.exception.values[0].stacktrace.frames !== undefined
      ) {
        event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames.map(
          frame => {
            if (frame.filename !== undefined) {
              frame.filename = normalizeUrl(frame.filename)
            }
            return frame
          }
        )
      }

      return event
    })
  })
}

const fetchAppVersion = async () => {
  const response = await axios.get('../manifest.json')
  return response.data.version
}

export const initializeSentry = async (Vue: VueConstructor) => {
  let release: string | undefined = undefined

  try {
    // これはアプリに絶対必要な処理じゃないため、例外を吐いても握りつぶす
    release = 'vrchat-friend-instance-list@' + (await fetchAppVersion())
  } finally {
    Sentry.init({
      dsn:
        'https://828ea2de6f3b4ba08ea3606d69d97b9a@o476585.ingest.sentry.io/5516530',
      integrations: function(integrations) {
        // Sentryへのエラー通知は自前でやるのでGlobalHandlersは邪魔
        return integrations.filter(function(integration) {
          return integration.name !== 'GlobalHandlers'
        })
      },
      beforeSend(event) {
        // 「ResizeObserver loop completed with undelivered notifications」
        // このエラーは動作に支障がないものなので無視する
        if (
          isResizeObserverLoopCompletedWithUndeliveredNotificationsError(event)
        ) {
          return null
        }

        return event
      },
      release,
    })
    fixStackTraceFileName()
  }
}
