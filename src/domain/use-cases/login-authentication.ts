import { AuthenticationError } from '@/domain/errors'
import { UserRepository } from '@/domain/contracts/repos'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { AccessToken } from '@/domain/entities'

type Setup = (userRepository: UserRepository, crypto: TokenGenerator) => LoginAuthentication
type Input = { user: string, password: string }
type Output = { accessToken: string }
export type LoginAuthentication = (params: Input) => Promise<Output>

export const setupLoginAuthentication: Setup = (userRepository, crypto) => async params => {
  const accountUserId = await userRepository.loadUser(params)
  if (accountUserId !== undefined) {
    const accessToken = await crypto.generateToken({
      key: accountUserId.userId,
      expirationInMs: AccessToken.expirationInMs
    })
    return { accessToken }
  }
  throw new AuthenticationError()
}
