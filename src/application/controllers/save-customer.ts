import { LoadCustomer, SaveCustomer } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { HttpResponse, notFound, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = {
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

export class SaveCustomerController extends Controller {
  constructor (
    private readonly saveCustomer: SaveCustomer,
    private readonly loadCustomer: LoadCustomer
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const loadCustomer = await this.loadCustomer(httpRequest)
      if (!loadCustomer) {
        const saveCustomer = await this.saveCustomer(httpRequest)
        return ok(saveCustomer)
      } else {
        return unauthorized()
      }
    } catch {
      return notFound()
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.cpf, fieldName: 'cpf' }).required().build(),
      ...Builder.of({ value: httpRequest.bairro, fieldName: 'bairro' }).required().build(),
      ...Builder.of({ value: httpRequest.cep, fieldName: 'cep' }).required().build(),
      ...Builder.of({ value: httpRequest.cidade, fieldName: 'cidade' }).required().build(),
      ...Builder.of({ value: httpRequest.complemento, fieldName: 'complemento' }).required().build(),
      ...Builder.of({ value: httpRequest.email, fieldName: 'email' }).required().build(),
      ...Builder.of({ value: httpRequest.endereco, fieldName: 'endereco' }).required().build(),
      ...Builder.of({ value: httpRequest.grau_de_parentesco, fieldName: 'grau_de_parentesco' }).required().build(),
      ...Builder.of({ value: httpRequest.identidade, fieldName: 'identidade' }).required().build(),
      ...Builder.of({ value: httpRequest.nome, fieldName: 'nome' }).required().build(),
      ...Builder.of({ value: httpRequest.numero, fieldName: 'numero' }).required().build(),
      ...Builder.of({ value: httpRequest.orgao_emissor, fieldName: 'orgao_emissor' }).required().build(),
      ...Builder.of({ value: httpRequest.telefone01, fieldName: 'telefone01' }).required().build(),
      ...Builder.of({ value: httpRequest.telefone02, fieldName: 'telefone02' }).required().build(),
      ...Builder.of({ value: httpRequest.uf, fieldName: 'uf' }).required().build()
    ]
  }
}
