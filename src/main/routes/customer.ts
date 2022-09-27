import { adaptExpressRoute } from '@/main/adapters'
import {
  makeCustomerController as adapt,
  makeSaveCustomerController as saveCustomer
} from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/load-customer/:cpf?', adaptExpressRoute(adapt()))
  router.post('/save_customer', adaptExpressRoute(saveCustomer()))
}
