import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoginAuthentication } from '@/domain/use-cases'

type HttpRequest = { usuario: string, senha: string }

type Output = { detail: string, user_message?: string } | { accessToken: string }

export class LoginController extends Controller {
  constructor (private readonly loginAuth: LoginAuthentication) {
    super()
  }

  async perform ({ usuario, senha }: HttpRequest): Promise<HttpResponse<Output>> {
    try {
      const authUser = await this.loginAuth(usuario, senha)
      return ok(authUser)
    } catch (err) {
      console.log(err)
      return unauthorized(err)
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.usuario, fieldName: 'usuario' }).required().build(),
      ...Builder.of({ value: httpRequest.senha, fieldName: 'senha' }).required().build()
    ]
  }
}
