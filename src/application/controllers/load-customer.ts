import { LoadCustomer } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, notFound, ok } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = { cpf: string }

type Model = Error | {
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

export class LoadCustomerController extends Controller {
  constructor (private readonly loadCustomer: LoadCustomer) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const searchCustomer = await this.loadCustomer({ cpf: httpRequest.cpf })
      return ok(searchCustomer)
    } catch {
      return notFound()
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.cpf, fieldName: 'cpf' }).required().build()
    ]
  }
}
