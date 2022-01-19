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

export const unionBy = <T>(
  newItems: T[],
  oldItems: T[],
  comparator: (a: T, b: T) => boolean
) => {
  const duplicateRemovedOldItems = oldItems.filter((oldItem) => {
    const isExist =
      newItems.find((newItem) => comparator(newItem, oldItem)) !== undefined

    return !isExist
  })

  return newItems.concat(duplicateRemovedOldItems)
}

// 参考：https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_uniqwith
export const uniqWith = <T>(
  targetArray: T[],
  comparator: (a: T, b: T) => boolean
) => {
  return targetArray.filter(
    (element, index) =>
      targetArray.findIndex((step) => comparator(element, step)) === index
  )
}
