import { NotFound } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { LoadUserRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'
import { AccessToken } from '@/domain/models'

export class LoginAuthenticationService {
  constructor (
    private readonly loadUserRepo: LoadUserRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform (params: LoginAuthentication.Params): Promise<LoginAuthentication.Result> {
    const requestIdUser = await this.loadUserRepo.loadUser(params)
    if (requestIdUser !== undefined) {
      await this.crypto.generateToken({ key: requestIdUser.id, expirationInMs: AccessToken.expirationInMs })
    }
    return new NotFound()
  }
}
