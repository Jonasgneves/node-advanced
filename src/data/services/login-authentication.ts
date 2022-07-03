import { NotFound } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'
import { LoadUserRepository } from '@/data/contracts/repos'
import { TokenGenerator } from '@/data/contracts/crypto'

export class LoginAuthenticationService {
  constructor (
    private readonly loadUserRepo: LoadUserRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform (params: LoginAuthentication.Params): Promise<LoginAuthentication.Result> {
    const idUser = await this.loadUserRepo.loadUser(params)
    if (idUser !== undefined) {
      await this.crypto.generateToken({ key: idUser.id })
    }
    return new NotFound()
    // await this.loadLoginUser.loadUserLoginApi(params)
    // return new AuthenticationError()
  }
}
