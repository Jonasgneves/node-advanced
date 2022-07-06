// import { AuthenticationError } from '@/domain/errors'
import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'

import { mock, MockProxy } from 'jest-mock-extended'

class LoginController {
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

type HttpResponse = {
  statusCode: number
  data: any
}

class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

describe('LoginController', () => {
  let sut: LoginController
  let loginAuth: MockProxy<LoginAuthentication>

  beforeAll(() => {
    loginAuth = mock()
    loginAuth.auth.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new LoginController(loginAuth)
  })

  it('should return 400 if token is empty', async () => {
    const httpResponse = await sut.handle({ token: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is Required')
    })
  })

  it('should return 400 if token is null', async () => {
    const httpResponse = await sut.handle({ token: null })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is Required')
    })
  })

  it('should return 400 if token is undefined', async () => {
    const httpResponse = await sut.handle({ token: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is Required')
    })
  })

  it('should call LoginAuthentication with correct params', async () => {
    await sut.handle({ user: 'any_user', password: 'any_password', token: 'any_token' })

    expect(loginAuth.auth).toHaveBeenCalledWith({ user: 'any_user', password: 'any_password' })
    expect(loginAuth.auth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    loginAuth.auth.mockResolvedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ token: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new AuthenticationError()
    })
  })

  it('should return 200 if authentication success', async () => {
    const httpResponse = await sut.handle({ token: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value'
      }
    })
  })

  it('should return 500 if authentication throws', async () => {
    const error = new Error('infra_error')
    loginAuth.auth.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({ token: 'any_token' })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
