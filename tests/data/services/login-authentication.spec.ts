import { AuthenticationError } from '@/domain/errors'
import { LoginAuthenticationService } from '@/data/services'
import { LoadUserLoginApi } from '@/data/contracts/apis'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: LoginAuthenticationService
  loadLoginUser: MockProxy<LoadUserLoginApi>
}

const makeSut = (): SutTypes => {
  const loadLoginUser = mock<LoadUserLoginApi>()
  const sut = new LoginAuthenticationService(loadLoginUser)

  return {
    sut,
    loadLoginUser
  }
}

describe('LoginAuthenticationService', () => {
  it('Should call LoadUserLoginApi with correct params', async () => {
    const { sut, loadLoginUser } = makeSut()

    await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledWith({ user: 'any_login', password: 'any_senha' })
    expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledTimes(1)
  })

  it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
    const { sut, loadLoginUser } = makeSut()
    loadLoginUser.loadUserLoginApi.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ user: 'any_login', password: 'any_senha' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
