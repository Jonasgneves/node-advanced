import { CitizenRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/application/errors'
import { ContatoCidadao, EnderecoCidadao } from '@/application/controllers'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'

type Input = {
  ID_CIDADAO: string
  NOME: string
  RG: string
  CPF: string
  ENDERECO: EnderecoCidadao
  CONTATO: ContatoCidadao
}

type Setup = (citizenRepository: CitizenRepository) => SaveCitizen
export type SaveCitizen = (params: Input) => Promise<{CIDADAO: Cidadao, ENDERECO: Endereco, CONTATO: Contato}>

export const setupSaveCitizen: Setup = (citizenRepository) => async params => {
  const savedCitizen = await citizenRepository.saveCitizen(params)
  if (savedCitizen !== undefined) return savedCitizen
  throw new ServerError()
}
