import { LoginAuthentication } from '@/domain/features'

import { mock, MockProxy } from 'jest-mock-extended'

class LoginController {
  constructor (private readonly loginAuth: LoginAuthentication) {}
  async handle (httpRequest: any): Promise<HttpResponse> {
    await this.loginAuth.auth({ user: httpRequest.user, password: httpRequest.password })
    return {
      statusCode: 400,
      data: new Error('The field token is Required')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}

describe('LoginController', () => {
  let sut: LoginController
  let loginAuth: MockProxy<LoginAuthentication>
  beforeAll(() => {
    loginAuth = mock()
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
    await sut.handle({ user: 'any_user', password: 'any_password' })

    expect(loginAuth.auth).toHaveBeenCalledWith({ user: 'any_user', password: 'any_password' })
    expect(loginAuth.auth).toHaveBeenCalledTimes(1)
  })
})
