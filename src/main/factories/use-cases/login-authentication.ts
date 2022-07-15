import { LoginAuthenticationUseCase } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeLoginAuthentication = (): LoginAuthenticationUseCase => {
  return new LoginAuthenticationUseCase(
    makeUserAccountRepository(),
    makeJwtTokenGenerator()
  )
}
