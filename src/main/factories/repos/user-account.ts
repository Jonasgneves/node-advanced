import { PgUserAccountRepository } from '@/infra/postgres/repos'

export const makeUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}
