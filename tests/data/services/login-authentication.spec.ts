import { AuthenticationError } from '@/domain/errors'
import { LoginAuthenticationService } from '@/data/services'
import { LoadUserLoginApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginAuthenticationService', () => {
  let loadLoginUser: MockProxy<LoadUserLoginApi>
  let sut: LoginAuthenticationService
  const user = 'any_login'
  const password = 'any_password'

  beforeEach(() => {
    loadLoginUser = mock()
    sut = new LoginAuthenticationService(loadLoginUser)
  })

  it('Should call LoadUserLoginApi with correct params', async () => {
    await sut.perform({ user, password })

    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledWith({ user, password })
    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
    loadLoginUser.loadUserLoginApi.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ user, password })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
