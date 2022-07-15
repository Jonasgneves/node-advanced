import { LoginAuthentication } from '@/domain/features'
import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { AccessToken } from '@/domain/entities'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'

type HttpRequest = {
  user: string
  password: string
}

type Model = Error | {
  accessToken: string
}
export class LoginController extends Controller {
  constructor (private readonly loginAuth: LoginAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const accessToken = await this.loginAuth.auth({ user: httpRequest.user, password: httpRequest.password })
    return accessToken instanceof AccessToken
      ? ok({ accessToken: accessToken.value })
      : unauthorized()
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.user, fieldName: 'user' }).required().build(),
      ...Builder.of({ value: httpRequest.password, fieldName: 'password' }).required().build()
    ]
  }
}
