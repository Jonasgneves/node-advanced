import { HttpResponse, unauthorized, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { LoginAuthentication } from '@/domain/use-cases'

type HttpRequest = { user: string, password: string }

type Model = Error | { accessToken: string }

export class LoginController extends Controller {
  constructor (private readonly loginAuth: LoginAuthentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const accessToken = await this.loginAuth({ user: httpRequest.user, password: httpRequest.password })
      return ok(accessToken)
    } catch (err) {
      console.log(err)
      return unauthorized()
    }
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: httpRequest.user, fieldName: 'user' }).required().build(),
      ...Builder.of({ value: httpRequest.password, fieldName: 'password' }).required().build()
    ]
  }
}
