import { ILogger } from '@/libs/Logger/ILogger'
import * as Sentry from '@sentry/browser'

export class ProductionLogger implements ILogger {
  error(message: string | Error) {
    Sentry.captureException(message)
  }

  warn(message: string) {
    // 出力なし
  }

  info(message: string) {
    // 出力なし
  }

  debug(message: string) {
    // 出力なし
  }

  log(message: string) {
    // 出力なし
  }
}
