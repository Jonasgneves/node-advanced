import { LoginAuthenticationService } from '@/data/services'
import { UserRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'
import { AuthenticationError, MissingParamError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

import { mock, MockProxy } from 'jest-mock-extended'

describe('LoginAuthenticationService', () => {
  let loadUserRepo: MockProxy<UserRepository>
  let crypto: MockProxy<TokenGenerator>
  let sut: LoginAuthenticationService
  let user: string
  let password: string

  beforeAll(() => {
    user = 'any_user'
    password = 'any_password'
    loadUserRepo = mock()
    crypto = mock()
    crypto.generateToken.mockResolvedValue('any_generated_token')
    loadUserRepo.loadUser.mockResolvedValue({ userId: 'any_user_id' })
  })

  beforeEach(() => {
    sut = new LoginAuthenticationService(
      loadUserRepo,
      crypto
    )
  })

  it('Should call UserAccountRepo with correct params', async () => {
    await sut.auth({ user, password })

    expect(loadUserRepo.loadUser).toHaveBeenCalledWith({ user, password })
    expect(loadUserRepo.loadUser).toHaveBeenCalledTimes(1)
  })

  it('Should throw a MissingParamError when UserAccountRepo no receive a user', async () => {
    const userData = { user: undefined, password }
    const result = await sut.auth(userData)

    expect(result).toEqual(new MissingParamError('User'))
  })

  it('Should throw a MissingParamError when UserAccountRepo no receive a password', async () => {
    const userData = { user, password: undefined }
    const result = await sut.auth(userData)

    expect(result).toEqual(new MissingParamError('Password'))
  })

  it('Should throw a AuthenticationError when UserRepository return undefined', async () => {
    loadUserRepo.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.auth({ user, password })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it('Should call TokenGenerator whith correct params', async () => {
    await sut.auth({ user, password })

    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_user_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  it('Should return an accessToken success', async () => {
    const authResult = await sut.auth({ user, password })

    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })

  it('Should rethrow if UserRepository throws', async () => {
    loadUserRepo.loadUser.mockRejectedValueOnce(new Error('user_repo'))

    const promise = sut.auth({ user, password })

    await expect(promise).rejects.toThrow(new Error('user_repo'))
  })

  it('Should rethrow if TokenGenerator throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_error'))

    const promise = sut.auth({ user, password })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
