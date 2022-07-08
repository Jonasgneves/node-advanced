import { LoginAuthentication } from '@/domain/features'
import { badRequest, HttpResponse, serverError, unauthorized, ok } from '@/application/helpers'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError } from '@/application/errors'

export class LoginController {
  constructor (private readonly loginAuth: LoginAuthentication) {}
  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.user === undefined || httpRequest.user === '' || httpRequest.user === null) {
        return badRequest(new RequiredFieldError('User'))
      }
      if (httpRequest.password === undefined || httpRequest.password === '' || httpRequest.password === null) {
        return badRequest(new RequiredFieldError('Password'))
      }
      const accessToken = await this.loginAuth.auth({ user: httpRequest.user, password: httpRequest.password })
      if (accessToken instanceof AccessToken) {
        return ok({ accessToken: accessToken.value })
      } else {
        return unauthorized()
      }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
