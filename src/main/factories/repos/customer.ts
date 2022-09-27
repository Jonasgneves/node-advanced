import { CustomerRepository } from '@/infra/repos'

export const makeCustomerRespository = (): CustomerRepository => {
  return new CustomerRepository()
}
