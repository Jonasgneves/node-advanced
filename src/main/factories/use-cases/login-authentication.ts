import { setupLoginAuthentication, LoginAuthentication } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'

export const makeLoginAuthentication = (): LoginAuthentication => {
  return setupLoginAuthentication(
    makeUserAccountRepository(),
    makeJwtTokenGenerator()
  )
}
