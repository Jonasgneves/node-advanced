import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { UserRepository } from '@/domain/contracts/repos'
import { TokenGenerator } from '@/domain/contracts/crypto'
import { AccessToken } from '@/domain/models'

export class LoginAuthenticationService implements LoginAuthentication {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly crypto: TokenGenerator
  ) {
  }

  async auth (params: LoginAuthentication.Params): Promise<LoginAuthentication.Result> {
    const accountUserId = await this.userRepository.loadUser(params)
    if (accountUserId !== undefined) {
      const token = await this.crypto.generateToken({
        key: accountUserId.userId,
        expirationInMs: AccessToken.expirationInMs
      })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
