import { ILogger } from './ILogger'
import * as Sentry from '@sentry/browser'

export class ProductionLogger implements ILogger {
  error(message: string | Error) {
    Sentry.captureException(message)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(message: string) {
    // 出力なし
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(message: string) {
    // 出力なし
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug(message: string) {
    // 出力なし
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  log(message: string) {
    // 出力なし
  }
}
