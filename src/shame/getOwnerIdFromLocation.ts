import { InstanceLocation } from '../types'

export function getOwnerIdFromLocation(
  location: InstanceLocation
): string | undefined {
  const regExResult = /\(.*?\)/.exec(location)
  if (regExResult === null) {
    return undefined
  }

  return regExResult[0].replace('(', '').replace(')', '')
}
