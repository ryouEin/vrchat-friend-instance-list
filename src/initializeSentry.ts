import * as Sentry from '@sentry/browser'
import axios from 'axios'

const fixStackTraceFileName = () => {
  const normalizeUrl = (url: string) => {
    return url.replace(/(moz|chrome)-extension:\/\/[^/]+\//, '~/')
  }

  Sentry.configureScope((scope) => {
    scope.addEventProcessor(async (event) => {
      if (
        event.exception !== undefined &&
        event.exception.values !== undefined &&
        event.exception.values[0].stacktrace !== undefined &&
        event.exception.values[0].stacktrace.frames !== undefined
      ) {
        event.exception.values[0].stacktrace.frames = event.exception.values[0].stacktrace.frames.map(
          (frame) => {
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

export const initializeSentry = async () => {
  let release: string | undefined = undefined

  try {
    // これはアプリに絶対必要な処理じゃないため、例外を吐いても握りつぶす
    release = 'vrchat-friend-instance-list@' + (await fetchAppVersion())
  } finally {
    Sentry.init({
      dsn:
        'https://828ea2de6f3b4ba08ea3606d69d97b9a@o476585.ingest.sentry.io/5516530',
      integrations: function (integrations) {
        // Sentryへのエラー通知は自前でやるのでGlobalHandlersは邪魔
        return integrations.filter(function (integration) {
          return integration.name !== 'GlobalHandlers'
        })
      },
      ignoreErrors: [],
      // 本番環境では必要ないが、デバッグする際に頻繁に使うので書いてる
      beforeSend(event) {
        return event
      },
      release,
    })
    fixStackTraceFileName()
  }
}
