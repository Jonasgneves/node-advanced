import { setupLoginAuthentication, LoginAuthentication } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenHandler } from '@/main/factories/crypto'

export const makeLoginAuthentication = (): LoginAuthentication => {
  return setupLoginAuthentication(
    makeUserAccountRepository(),
    makeJwtTokenHandler()
  )
}
