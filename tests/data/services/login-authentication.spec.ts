import { AuthenticationError } from '@/domain/errors'
import { LoginAuthenticationService } from '@/data/services'
import { LoadUserLoginApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginAuthenticationService', () => {
  let loadLoginUser: MockProxy<LoadUserLoginApi>
  let sut: LoginAuthenticationService

  beforeEach(() => {
    loadLoginUser = mock()
    sut = new LoginAuthenticationService(loadLoginUser)
  })

  it('Should call LoadUserLoginApi with correct params', async () => {
    await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledWith({ user: 'any_login', password: 'any_senha' })
    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
    loadLoginUser.loadUserLoginApi.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
