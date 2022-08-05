import { SearchCustomer } from '@/domain/contracts/repos'
import { LoadCustomer, setupLoadCustomer } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('setupLoadCustomer', () => {
  let cpf: string
  let loadCustomer: MockProxy<SearchCustomer>
  let sut: LoadCustomer

  beforeAll(() => {
    cpf = 'valid_cpf'
    loadCustomer = mock()
  })

  beforeEach(() => {
    sut = setupLoadCustomer(loadCustomer)
  })

  it('should call customerRepo with correct params', async () => {
    await sut({ cpf: 'valid_cpf' })

    expect(loadCustomer.load).toHaveBeenCalledWith({ cpf })
    expect(loadCustomer.load).toHaveBeenCalledTimes(1)
  })
})
