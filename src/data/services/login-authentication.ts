import { AuthenticationError, MissingParamError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { UserRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '../contracts/crypto'
import { AccessToken } from '@/domain/models'
// import { TokenGenerator } from '@/data/contracts/crypto'
// import { AccessToken } from '@/domain/models'

export class LoginAuthenticationService implements LoginAuthentication {
  constructor (
    private readonly userRepository: UserRepository,
    private readonly crypto: TokenGenerator
  ) {
  }

  async auth (params: LoginAuthentication.Params): Promise<LoginAuthentication.Result> {
    if (!params.user) return new MissingParamError('User')
    if (!params.password) return new MissingParamError('Password')
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
