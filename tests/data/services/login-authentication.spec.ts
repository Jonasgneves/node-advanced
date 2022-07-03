import { LoginAuthenticationService } from '@/data/services'
import { LoadUserRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'
import { NotFound } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginAuthenticationService', () => {
  let loadUserRepo: MockProxy<LoadUserRepository>
  let crypto: MockProxy<TokenGenerator>
  let sut: LoginAuthenticationService
  const user = 'any_login'
  const password = 'any_password'

  beforeEach(() => {
    loadUserRepo = mock()
    loadUserRepo.loadUser.mockResolvedValue(undefined)
    loadUserRepo.loadUser.mockResolvedValueOnce({ id: 'any_user_id' })
    crypto = mock()
    // loadLoginUser = mock()
    sut = new LoginAuthenticationService(
      loadUserRepo,
      crypto
    )
  })

  it('Should call UserAccountRepo with correct params', async () => {
    await sut.perform({ user, password })

    expect(loadUserRepo.loadUser).toHaveBeenCalledWith({ user, password })
    expect(loadUserRepo.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should returns when UserAccountRepo return undefined', async () => {
    const verifyUserResult = await sut.perform({ user, password })

    expect(verifyUserResult).toEqual(new NotFound())
  })

  it('Should call TokenGenerator whit correct params', async () => {
    await sut.perform({ user, password })

    expect(crypto.generateToken).toHaveBeenCalledWith({ key: 'any_user_id' })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  // it('Should call LoadUserLoginApi with correct params', async () => {
  //   await sut.perform({ user, password })

  //   expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledWith({ user, password })
  //   expect(loadLoginUser.loadUserLoginApi).toHaveBeenCalledTimes(1)
  // })

  // it('Should return AuthenticationError when LoadUserLoginApi returns undefined', async () => {
  //   loadLoginUser.loadUserLoginApi.mockResolvedValue(undefined)

  //   const authResult = await sut.perform({ user, password })

  //   expect(authResult).toEqual(new AuthenticationError())
  // })
})
