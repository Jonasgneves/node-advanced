import { NotFoundError } from '@/application/errors'
import { CustomerRepository } from '@/domain/contracts/repos'

type Setup = (loadCustomer: CustomerRepository) => LoadCustomer
type Input = { cpf: string }
type Output = {
  nome: string
  cpf: string
  identidade: string
  orgao_emissor: string
  grau_de_parentesco: string
  telefone01: string
  telefone02: string
  endereco: string
  numero: string
  complemento: string
  cep: string
  bairro: string
  cidade: string
  uf: string
  email: string
}

export type LoadCustomer = (input: Input) => Promise<Output>

export const setupLoadCustomer: Setup = loadCustomer => async ({ cpf }) => {
  const customer = await loadCustomer.load({ cpf })
  if (customer !== undefined) {
    return customer
  }
  throw new NotFoundError()
}
