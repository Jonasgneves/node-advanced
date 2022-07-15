import { LoginAuthenticationService } from '@/data/services'
import { makeUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeLoginAuthenticationService = (): LoginAuthenticationService => {
  return new LoginAuthenticationService(
    makeUserAccountRepository(),
    makeJwtTokenGenerator()
  )
}
