import { setupLoginAuthentication, LoginAuthentication } from '@/domain/use-cases'
import { UserRepository } from '@/domain/contracts/repos'
import { TokenGenerator } from '@/domain/contracts/gateways'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginAuthenticationService', () => {
  let loadUserRepo: MockProxy<UserRepository>
  let crypto: MockProxy<TokenGenerator>
  let sut: LoginAuthentication
  let user: string
  let password: string

  beforeAll(() => {
    user = 'any_user'
    password = 'any_password'
    loadUserRepo = mock()
    crypto = mock()
    crypto.generate.mockResolvedValue('any_generated_token')
    loadUserRepo.loadUser.mockResolvedValue({ userId: 'any_user_id' })
  })

  beforeEach(() => {
    sut = setupLoginAuthentication(
      loadUserRepo,
      crypto
    )
  })

  it('Should call UserAccountRepo with correct params', async () => {
    await sut({ user, password })

    expect(loadUserRepo.loadUser).toHaveBeenCalledWith({ user, password })
    expect(loadUserRepo.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should throw a AuthenticationError when UserRepository return undefined', async () => {
    loadUserRepo.loadUser.mockResolvedValueOnce(undefined)

    const promise = sut({ user, password })

    await expect(promise).rejects.toThrow(new AuthenticationError())
  })

  it('Should call TokenGenerator whith correct params', async () => {
    await sut({ user, password })

    expect(crypto.generate).toHaveBeenCalledWith({
      key: 'any_user_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generate).toHaveBeenCalledTimes(1)
  })

  it('Should return an accessToken success', async () => {
    const authResult = await sut({ user, password })

    expect(authResult).toEqual({ accessToken: 'any_generated_token' })
  })

  it('Should rethrow if UserRepository throws', async () => {
    loadUserRepo.loadUser.mockRejectedValueOnce(new Error('user_repo'))

    const promise = sut({ user, password })

    await expect(promise).rejects.toThrow(new Error('user_repo'))
  })

  it('Should rethrow if TokenGenerator throws', async () => {
    crypto.generate.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut({ user, password })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
