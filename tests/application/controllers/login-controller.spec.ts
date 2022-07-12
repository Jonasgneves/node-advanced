import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { LoginController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator, ValidationComposite } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'jest-mock'

jest.mock('@/application/validation/composite')

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

  it('should return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const result = await sut.handle({ user, password })

    expect(ValidationCompositeSpy).toHaveBeenCalledWith([
      new RequiredStringValidator('any_user', 'user'),
      new RequiredStringValidator('any_password', 'password')
    ])
    expect(result).toEqual({
      statusCode: 400,
      data: error
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
