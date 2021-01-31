import { ProductionLogger } from '../libs/Logger/ProductionLogger'
import { DevelopmentLogger } from '../libs/Logger/DevelopmentLogger'

export const logger = (() => {
  if (process.env.NOD_ENV === 'production') {
    return new ProductionLogger()
  }

  return new DevelopmentLogger()
})()
