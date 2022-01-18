import { InstanceLocation } from '../types'

export function getOwnerIdFromLocation(
  location: InstanceLocation
): string | undefined {
  const regExResult = /(hidden|friends|private)((\(.*?\)))/.exec(location)
  if (regExResult === null) {
    return undefined
  }

  return regExResult[2].replace('(', '').replace(')', '')
}
