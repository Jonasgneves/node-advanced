// import { AuthenticationError } from '@/domain/errors'
import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { LoginController } from '@/application/controllers'
import { RequiredFieldError, ServerError, UnauthorizedError } from '@/application/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginController', () => {
  let sut: LoginController
  let loginAuth: MockProxy<LoginAuthentication>
  let user: string
  let password: string

  beforeAll(() => {
    user = 'any_user'
    password = 'any_password'
    loginAuth = mock()
    loginAuth.auth.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new LoginController(loginAuth)
  })

  it('should return 400 if user is undefined', async () => {
    const userData = { user: undefined as any, password }
    const result = await sut.handle(userData)

    expect(result).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('User')
    })
  })

  it('should return 400 if password is undefined', async () => {
    const userData = { user, password: undefined }
    const result = await sut.handle(userData)

    expect(result).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('Password')
    })
  })

  it('should return 400 if user is empty', async () => {
    const userData = { user: '', password }
    const result = await sut.handle(userData)

    expect(result).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('User')
    })
  })

  it('should return 400 if password is empty', async () => {
    const userData = { user, password: '' }
    const result = await sut.handle(userData)

    expect(result).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('Password')
    })
  })

  it('should return 400 if user is null', async () => {
    const userData = { user: null as any, password }
    const result = await sut.handle(userData)

    expect(result).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('User')
    })
  })

  it('should return 400 if password is null', async () => {
    const userData = { user, password: null }
    const result = await sut.handle(userData)

    expect(result).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('Password')
    })
  })

  it('should call LoginAuthentication with correct params', async () => {
    await sut.handle({ user, password })

    expect(loginAuth.auth).toHaveBeenCalledWith({ user, password })
    expect(loginAuth.auth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    loginAuth.auth.mockResolvedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ user, password })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if authentication success', async () => {
    const httpResponse = await sut.handle({ user, password })

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
    const httpResponse = await sut.handle({ user, password })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
