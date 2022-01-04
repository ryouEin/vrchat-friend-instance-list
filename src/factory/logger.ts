import { ProductionLogger } from '../libs/Logger/ProductionLogger'
import { DevelopmentLogger } from '../libs/Logger/DevelopmentLogger'
import { ENVIRONMENT } from '../config/env'

export const logger = (() => {
  if (ENVIRONMENT === 'production') {
    return new ProductionLogger()
  }

  return new DevelopmentLogger()
})()
