import { LoginAuthentication } from '@/domain/features'
import { HttpResponse } from '@/application/helpers'
import { AccessToken } from '@/domain/models'
import { ServerError } from '@/application/errors'

export class LoginController {
  constructor (private readonly loginAuth: LoginAuthentication) {}
  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return {
          statusCode: 400,
          data: new Error('The field token is Required')
        }
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
