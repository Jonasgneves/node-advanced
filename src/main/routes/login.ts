import { adaptExpressRoute } from '@/infra/http'
import { makeLoginController as adapt } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/login', adaptExpressRoute(adapt()))
}
