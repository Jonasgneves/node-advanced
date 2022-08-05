import { mock } from 'jest-mock-extended'

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
  it('should call customerRepo with correct params', async () => {
    const cpf = 'any_cpf'
    const loadCustomer = mock<SearchCustomer>()
    const sut = setupLoadCustomer(loadCustomer)

    await sut({ cpf: 'any_cpf' })

    expect(loadCustomer.load).toHaveBeenCalledWith({ cpf })
    expect(loadCustomer.load).toHaveBeenCalledTimes(1)
  })
})
