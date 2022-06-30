import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'

class LoginAuthenticationService {
  constructor (
    private readonly loadLoginUser: LoadUserLoginApi
  ) {}

  async perform (params: LoginAuthentication.Params): Promise<AuthenticationError> {
    await this.loadLoginUser.loadUserLoginApi(params)
    return new AuthenticationError()
  }
}

interface LoadUserLoginApi {
  loadUserLoginApi: (params: LoadUserLoginApi.Params) => Promise<LoadUserLoginApi.Result>
}

namespace LoadUserLoginApi {
  export type Params = {
    user: string
    password: string
  }

  export type Result = undefined
}

class LoadUserLoginApiSpy implements LoadUserLoginApi {
  signin?: LoginAuthentication.Params
  result = undefined

  async loadUserLoginApi (params: LoginAuthentication.Params): Promise<LoadUserLoginApi.Result> {
    this.signin = params
    return this.result
  }
}

describe('LoginAuthenticationService', () => {
  it('Should call LoadUserLoginApi with correct params', async () => {
    const loadLoginUser = new LoadUserLoginApiSpy()
    const sut = new LoginAuthenticationService(loadLoginUser)

    await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(loadLoginUser.signin).toEqual({ user: 'any_login', password: 'any_senha' })
  })

  it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
    const loadLoginUser = new LoadUserLoginApiSpy()
    loadLoginUser.result = undefined
    const sut = new LoginAuthenticationService(loadLoginUser)

    const authResult = await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
