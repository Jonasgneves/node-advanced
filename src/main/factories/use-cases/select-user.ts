import { SelectUser, setupSelectUser } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'

export const makeSelectUser = (): SelectUser => {
  return setupSelectUser(makeUserAccountRepository())
}
