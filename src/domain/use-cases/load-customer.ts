import { SearchCustomer } from '@/domain/contracts/repos'

type Setup = (loadCustomer: SearchCustomer) => LoadCustomer
type Input = { cpf: string }
export type LoadCustomer = (input: Input) => Promise<void>

export const setupLoadCustomer: Setup = loadCustomer => async ({ cpf }) => {
  await loadCustomer.load({ cpf })
}
