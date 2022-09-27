import { NotFoundError } from '@/application/errors'
import { SearchCustomer } from '@/domain/contracts/repos'
import { LoadCustomer, setupLoadCustomer } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('setupLoadCustomer', () => {
  // let cpf: string
  let loadCustomer: MockProxy<SearchCustomer>
  let sut: LoadCustomer

  beforeAll(() => {
    // cpf = 'valid_cpf'
    loadCustomer = mock()
  })

  beforeEach(() => {
    sut = setupLoadCustomer(loadCustomer)
  })

  // it('should call SearchCustomer with correct params', async () => {
  //   await sut({ cpf: 'valid_cpf' })

  //   expect(loadCustomer.load).toHaveBeenCalledWith({ cpf })
  //   expect(loadCustomer.load).toHaveBeenCalledTimes(1)
  // })

  it('should throw notFoundError when SearchCustomer return undefined', async () => {
    loadCustomer.load.mockResolvedValueOnce(undefined)

    const promise = sut({ cpf: 'valid_cpf' })

    await expect(promise).rejects.toThrow(new NotFoundError())
  })
})
