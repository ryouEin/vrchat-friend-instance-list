import { UAParser } from 'ua-parser-js'

export const isPcDevice = (() => {
  const parser = new UAParser()
  const device = parser.getDevice()
  if (device.type !== 'mobile') {
    return true
  }

  return false
})()
