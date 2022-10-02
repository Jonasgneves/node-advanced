import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
// import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { SelectCitizen } from '@/domain/use-cases'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'
import { NotFoundError } from '../errors'

// export type EnderecoCidadao = {
//   ID_ENDERECO: string
//   LOGRADOURO: string
//   NUMERO: string
//   COMPLEMENTO: string
//   CEP: string
//   BAIRRO: string
//   CIDADE: string
//   UF: string
// }

// export type ContatoCidadao = {
//   ID_CONTATO: string
//   TELEFONE: string
//   CELULAR: string
//   EMAIL: string
// }

type Input = {
  nome?: string
  rg?: string
  cpf?: string
}

type Output = {
  CIDADAO: Cidadao
  ENDERECO: Endereco
  CONTATO: Contato
} | { detail: string, user_message?: string } | any[]

export class SelectCitizenController extends Controller {
  constructor (
    private readonly selectCitizen: SelectCitizen
  ) {
    super()
  }

  async perform ({ nome, rg, cpf }: Input): Promise<HttpResponse<Output>> {
    const error = new Error('A busca precisa ser feita com pelomenos um dos parâmetros NOME/RG/CPF')
    if (!nome && !rg && !cpf) return badRequest(error)
    try {
      const citizen = await this.selectCitizen(nome, rg, cpf)
      return ok(citizen)
    } catch (error) {
      console.log(error)
      if (error instanceof NotFoundError) return notFound(error)
      return serverError(error)
    }
  }

  // override buildValidators (httpRequest: Input): Validator[] {
  //   return [
  // ...Builder.of({ value: httpRequest?.nome, fieldName: 'nome' }).required().build(),
  // ...Builder.of({ value: httpRequest?.cpf, fieldName: 'cpf' }).required().build(),
  // ...Builder.of({ value: httpRequest?.rg, fieldName: 'rg' }).required().build()

  //   ]
  // }
}
