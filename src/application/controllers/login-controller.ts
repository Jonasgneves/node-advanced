import { LoginAuthentication } from '@/domain/features'
import { badRequest, HttpResponse } from '@/application/helpers'
import { AccessToken } from '@/domain/models'
import { RequiredFieldError, ServerError } from '@/application/errors'

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
      const result = await this.loginAuth.auth({ user: httpRequest.user, password: httpRequest.password })
      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: result.value
          }
        }
      } else {
        return {
          statusCode: 401,
          data: result
        }
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        data: new ServerError(error)
      }
    }
  }
}
