import { AuthenticationError } from '@/domain/errors'
import { UserRepository } from '@/domain/contracts/repos'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { AccessToken } from '@/domain/entities'

type Setup = (userRepository: UserRepository, crypto: TokenGenerator) => LoginAuthentication

export type LoginAuthentication = (params: { user: string, password: string }) => Promise<AccessToken | AuthenticationError>

export const setupLoginAuthentication: Setup = (userRepository, crypto) => async params => {
  const accountUserId = await userRepository.loadUser(params)
  if (accountUserId !== undefined) {
    const token = await crypto.generateToken({
      key: accountUserId.userId,
      expirationInMs: AccessToken.expirationInMs
    })
    return new AccessToken(token)
  }
  return new AuthenticationError()
}
