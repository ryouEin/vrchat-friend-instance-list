import { InstanceLocation, Region, Regions } from '../types'
import { logger } from '../factory/logger'

export const getRegionFromLocation: (
  location: InstanceLocation
) => Region | undefined = (location) => {
  const regexResult = location.match(/\~region\((.*?)\)/)
  if (regexResult === null) return undefined
  if (regexResult.length <= 1) return undefined

  const region = regexResult[1]
  switch (region) {
    case 'jp':
      return Regions.JP
    case 'us':
      return Regions.US
    case 'eu':
      return Regions.EU
  }

  logger.error(`unexpected region ${region}`)
  return undefined
}
