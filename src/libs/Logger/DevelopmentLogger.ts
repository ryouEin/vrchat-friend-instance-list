import { ILogger } from './ILogger'

export class DevelopmentLogger implements ILogger {
  error(message: string | Error) {
    console.error(message)
  }

  warn(message: string) {
    console.warn(message)
  }

  info(message: string) {
    console.info(message)
  }

  debug(message: string) {
    console.debug(message)
  }

  log(message: string) {
    console.log(message)
  }
}
