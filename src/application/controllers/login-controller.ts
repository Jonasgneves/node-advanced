import { LoginAuthentication } from '@/domain/features'
import { badRequest, HttpResponse, serverError, unauthorized, ok } from '@/application/helpers'
import { AccessToken } from '@/domain/models'
import { ValidationBuilder, ValidationComposite } from '@/application/validation'

type HttpRequest = {
  user: string
  password: string
}

type Model = Error | {
  accessToken: string
}
export class LoginController {
  constructor (private readonly loginAuth: LoginAuthentication) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
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

  private validate (httpRequest: HttpRequest): Error | undefined {
    return new ValidationComposite([
      ...ValidationBuilder.of({ value: httpRequest.user, fieldName: 'user' }).required().build(),
      ...ValidationBuilder.of({ value: httpRequest.password, fieldName: 'password' }).required().build()
    ]).validate()
  }
}
