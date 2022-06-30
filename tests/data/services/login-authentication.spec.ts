import { LoginAuthentication } from '@/domain/features'

class LoginAuthenticationService {
  constructor (
    private readonly loadLoginUser: LoadUserLoginApi
  ) {}

  async perform (params: LoginAuthentication.Params): Promise<void> {
    await this.loadLoginUser.loadUserLoginApi(params)
  }
}

interface LoadUserLoginApi {
  loadUserLoginApi: (params: LoadUserLoginApi.Params) => Promise<void>
}

namespace LoadUserLoginApi {
  export type Params = {
    user: string
    password: string
  }
}

class LoadUserLoginApiSpy implements LoadUserLoginApi {
  signin?: LoginAuthentication.Params
  async loadUserLoginApi (params: LoginAuthentication.Params): Promise<void> {
    this.signin = params
  }
}

describe('LoginAuthenticationService', () => {
  it('Should call LoadUserLoginApi with correct params', async () => {
    const loadLoginUser = new LoadUserLoginApiSpy()
    const sut = new LoginAuthenticationService(loadLoginUser)

    await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(loadLoginUser.signin).toEqual({ user: 'any_login', password: 'any_senha' })
  })
})
