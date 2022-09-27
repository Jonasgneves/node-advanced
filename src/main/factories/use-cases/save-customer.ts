import { SaveCustomer, setupSaveCustomer } from '@/domain/use-cases'
import { makeCustomerRespository } from '@/main/factories/repos'

export const makeSaveCustomer = (): SaveCustomer => {
  return setupSaveCustomer(
    makeCustomerRespository()
  )
}
