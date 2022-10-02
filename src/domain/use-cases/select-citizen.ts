import { CitizenRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/application/errors'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'

type Setup = (citizenRepository: CitizenRepository) => SelectCitizen
export type SelectCitizen = (NOME?: string, RG?: string, CPF?: string) => Promise<{CIDADAO: Cidadao, ENDERECO: Endereco, CONTATO: Contato} | any[]>

export const setupSelectCitizen: Setup = (citizenRepository) => async (NOME, RG, CPF) => {
  const citizen = await citizenRepository.selectCitizen(NOME, RG, CPF)
  if (citizen !== undefined) return citizen
  throw new ServerError()
}
