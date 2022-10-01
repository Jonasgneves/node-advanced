import { Controller } from '@/application/controllers'
import { created, HttpResponse, serverError } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { SaveCitizen } from '@/domain/use-cases'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'

export type EnderecoCidadao = {
  ID_ENDERECO: string
  LOGRADOURO: string
  NUMERO: string
  COMPLEMENTO: string
  CEP: string
  BAIRRO: string
  CIDADE: string
  UF: string
}

export type ContatoCidadao = {
  ID_CONTATO: string
  TELEFONE: string
  CELULAR: string
  EMAIL: string
}

type Input = {
  ID_CIDADAO: string
  NOME: string
  RG: string
  CPF: string
  ENDERECO: EnderecoCidadao
  CONTATO: ContatoCidadao
}

type Output = {
  CIDADAO: Cidadao
  ENDERECO: Endereco
  CONTATO: Contato
} | { detail: string, user_message?: string }

export class SaveCitizenController extends Controller {
  constructor (
    private readonly saveCitizen: SaveCitizen
  ) {
    super()
  }

  async perform (httpRequest: Input): Promise<HttpResponse<Output>> {
    try {
      const savedUser = await this.saveCitizen(httpRequest)
      return created(savedUser)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }

  override buildValidators (httpRequest: Input): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.NOME, fieldName: 'NOME' }).required().build(),
      ...Builder.of({ value: httpRequest.CPF, fieldName: 'CPF' }).required().build(),
      ...Builder.of({ value: httpRequest.ID_CIDADAO, fieldName: 'ID_CIDADAO' }).required().build(),
      ...Builder.of({ value: httpRequest.RG, fieldName: 'RG' }).required().build(),
      ...Builder.of({ value: httpRequest.ENDERECO, fieldName: 'ENDERECO' }).required().build(),
      ...Builder.of({ value: httpRequest.CONTATO, fieldName: 'CONTATO' }).required().build()

    ]
  }
}
