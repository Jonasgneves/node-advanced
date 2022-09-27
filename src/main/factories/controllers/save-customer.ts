import { SaveCustomerController } from '@/application/controllers'
import { makeSaveCustomer, makeCustomer } from '@/main/factories/use-cases'

export const makeSaveCustomerController = (): SaveCustomerController => {
  return new SaveCustomerController(makeSaveCustomer(), makeCustomer())
}
