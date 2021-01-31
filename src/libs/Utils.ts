import { MSecUnixTime } from '../types'

const zeroPadding: (target: number, count?: number) => string = (
  target,
  count = 2
) => {
  return String(target).padStart(count, '0')
}

export const convertUnixTimeToISO8601ExtendedUTC: (
  unixTime: MSecUnixTime
) => string = (unixTime) => {
  const dateObj = new Date(unixTime)

  const year = dateObj.getUTCFullYear()
  const month = zeroPadding(dateObj.getUTCMonth() + 1)
  const date = zeroPadding(dateObj.getUTCDate())
  const hours = zeroPadding(dateObj.getUTCHours())
  const minutes = zeroPadding(dateObj.getUTCMinutes())
  const seconds = zeroPadding(dateObj.getUTCSeconds())
  const mSec = zeroPadding(dateObj.getUTCMilliseconds(), 3)

  return `${year}-${month}-${date}T${hours}:${minutes}:${seconds}.${mSec}Z`
}
