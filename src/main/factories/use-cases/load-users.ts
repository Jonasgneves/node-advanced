import { LoadUsers, setupLoadUsers } from '@/domain/use-cases'
import { makeUserAccountRepository } from '@/main/factories/repos'

export const makeLoadUser = (): LoadUsers => {
  return setupLoadUsers(makeUserAccountRepository())
}
