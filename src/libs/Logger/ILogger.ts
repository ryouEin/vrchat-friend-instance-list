export interface ILogger {
  error(message: string | Error): void

  warn(message: string): void

  info(message: string): void

  debug(message: string): void

  log(message: string): void
}
