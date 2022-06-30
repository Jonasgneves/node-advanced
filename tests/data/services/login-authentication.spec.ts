import { AuthenticationError } from '@/domain/errors'
import { LoginAuthenticationService } from '@/data/services'
import { LoadUserLoginApi } from '@/data/contracts/apis'

import { mock } from 'jest-mock-extended'

describe('LoginAuthenticationService', () => {
  it('Should call LoadUserLoginApi with correct params', async () => {
    const loadLoginUser = mock<LoadUserLoginApi>()
    const sut = new LoginAuthenticationService(loadLoginUser)

    await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledWith({ user: 'any_login', password: 'any_senha' })
    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
    const loadLoginUser = mock<LoadUserLoginApi>()
    loadLoginUser.loadUserLoginApi.mockResolvedValueOnce(undefined)
    const sut = new LoginAuthenticationService(loadLoginUser)

    const authResult = await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
