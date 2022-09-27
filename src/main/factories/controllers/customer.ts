import { LoadCustomerController } from '@/application/controllers/load-customer'
import { makeCustomer } from '@/main/factories/use-cases'

export const makeCustomerController = (): LoadCustomerController => {
  return new LoadCustomerController(makeCustomer())
}
