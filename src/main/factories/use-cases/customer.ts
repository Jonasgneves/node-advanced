import { LoadCustomer, setupLoadCustomer } from '@/domain/use-cases'
import { makeCustomerRespository } from '@/main/factories/repos'

export const makeCustomer = (): LoadCustomer => {
  return setupLoadCustomer(
    makeCustomerRespository()
  )
}
