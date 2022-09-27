import { ServerError } from '@/application/errors'
import { CustomerRepository } from '@/domain/contracts/repos'

type Setup = (customer: CustomerRepository) => SaveCustomer
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

type Input = {
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

export type SaveCustomer = (input: Input) => Promise<Output>

export const setupSaveCustomer: Setup = customer => async (input) => {
  const customerSaved = await customer.save(input)
  if (customerSaved !== undefined) {
    return customerSaved
  }
  throw new ServerError()
}
