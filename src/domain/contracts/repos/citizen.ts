import { ContatoCidadao, EnderecoCidadao } from '@/application/controllers'
import { Cidadao, Endereco, Contato } from '@/infra/repos/mysql/entities'

export interface CitizenRepository {
  saveCitizen: (params: CitizenRepository.Input) => Promise<{CIDADAO: Cidadao, ENDERECO: Endereco, CONTATO: Contato}>
}

export namespace CitizenRepository {
  export type Input = {
    ID_CIDADAO: string
    NOME: string
    RG: string
    CPF: string
    ENDERECO: EnderecoCidadao
    CONTATO: ContatoCidadao
  }
}
