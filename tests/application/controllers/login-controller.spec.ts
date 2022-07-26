import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/entities'
import { LoginController } from '@/application/controllers'
import { UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'

describe('LoginController', () => {
  let sut: LoginController
  let loginAuth: jest.Mock
  let user: string
  let password: string

  beforeAll(() => {
    user = 'any_user'
    password = 'any_password'
    loginAuth = jest.fn()
    loginAuth.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new LoginController(loginAuth)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ user, password })

    expect(validators).toEqual([
      new RequiredStringValidator('any_user', 'user'),
      new RequiredStringValidator('any_password', 'password')
    ])
  })

  it('should call LoginAuthentication with correct params', async () => {
    await sut.handle({ user, password })

    expect(loginAuth).toHaveBeenCalledWith({ user, password })
    expect(loginAuth).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    loginAuth.mockResolvedValueOnce(new AuthenticationError())
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
})
