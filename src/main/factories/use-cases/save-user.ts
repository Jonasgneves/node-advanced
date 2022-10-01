import { SaveUser, setupSaveUser } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'
import { makeBcryptPassword } from '@/main/factories/gateways'

export const makeSaveUser = (): SaveUser => {
  return setupSaveUser(
    makeUserAccountRepository(),
    makeBcryptPassword()
  )
}
