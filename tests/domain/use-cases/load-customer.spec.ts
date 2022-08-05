import { mock, MockProxy } from 'jest-mock-extended'

type Setup = (loadCustomer: SearchCustomer) => LoadCustomer
type Input = { cpf: string }
type LoadCustomer = (input: Input) => Promise<void>

const setupLoadCustomer: Setup = loadCustomer => async ({ cpf }) => {
  await loadCustomer.load({ cpf })
}

interface SearchCustomer {
  load: (input: SearchCustomer.Input) => Promise<void>
}

namespace SearchCustomer {
  export type Input = { cpf: string }
}

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
