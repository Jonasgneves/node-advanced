import { PgUserAccountRepository } from '@/infra/repos'

export const makeUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}
