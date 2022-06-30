import { LoadUserLoginApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { LoginAuthentication } from '@/domain/features'

export class LoginAuthenticationService {
  constructor (
    private readonly loadLoginUser: LoadUserLoginApi
  ) {}

  async perform (params: LoginAuthentication.Params): Promise<AuthenticationError> {
    await this.loadLoginUser.loadUserLoginApi(params)
    return new AuthenticationError()
  }
}
