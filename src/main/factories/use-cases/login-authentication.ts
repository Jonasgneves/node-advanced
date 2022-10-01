import { setupLoginAuthentication, LoginAuthentication } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'
import { makeBcryptPassword, makeJwtTokenHandler } from '@/main/factories/gateways'

export const makeLoginAuthentication = (): LoginAuthentication => {
  return setupLoginAuthentication(
    makeUserAccountRepository(),
    makeJwtTokenHandler(),
    makeBcryptPassword()
  )
}
