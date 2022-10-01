import { Controller } from '@/application/controllers'
import { created, HttpResponse, serverError } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { SaveUser } from '@/domain/use-cases'

export type Input = {
  ID_USUARIO: string
  ID_LOGIN: string
  NOME: string
  CPF: string
  DATA_NASCIMENTO: string
  MATRICULA: string
  LOGIN: string
  SENHA: string
}

export type Output = {
  ID_USUARIO: string
  ID_LOGIN: string
  NOME: string | null
  CPF: string | null
  DATA_NASCIMENTO: string | null
  MATRICULA: string | null
  LOGIN: string | null
  SENHA: string | null
} | { detail: string, user_message?: string }

export class SaveUserController extends Controller {
  constructor (
    private readonly saveUser: SaveUser
  ) {
    super()
  }

  async perform (httpRequest: Input): Promise<HttpResponse<Output>> {
    try {
      const savedUser = await this.saveUser(httpRequest)
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
      ...Builder.of({ value: httpRequest.DATA_NASCIMENTO, fieldName: 'DATA_NASCIMENTO' }).required().build(),
      ...Builder.of({ value: httpRequest.MATRICULA, fieldName: 'MATRICULA' }).required().build(),
      ...Builder.of({ value: httpRequest.LOGIN, fieldName: 'LOGIN' }).required().build(),
      ...Builder.of({ value: httpRequest.SENHA, fieldName: 'SENHA' }).required().build()

    ]
  }
}
