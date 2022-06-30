import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { LoadUserLoginApi } from '@/data/contracts/apis'
import { LoginAuthenticationService } from '@/data/services'

export class LoadUserLoginApiSpy implements LoadUserLoginApi {
  signin?: LoginAuthentication.Params
  result = undefined
  callsCount = 0

  async loadUserLoginApi (params: LoginAuthentication.Params): Promise<LoadUserLoginApi.Result> {
    this.signin = params
    this.callsCount++
    return this.result
  }
}

describe('LoginAuthenticationService', () => {
  it('Should call LoadUserLoginApi with correct params', async () => {
    const loadLoginUser = new LoadUserLoginApiSpy()
    const sut = new LoginAuthenticationService(loadLoginUser)

    await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(loadLoginUser.signin).toEqual({ user: 'any_login', password: 'any_senha' })
    expect(loadLoginUser.callsCount).toBe(1)
  })

  it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
    const loadLoginUser = new LoadUserLoginApiSpy()
    loadLoginUser.result = undefined
    const sut = new LoginAuthenticationService(loadLoginUser)

    const authResult = await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
