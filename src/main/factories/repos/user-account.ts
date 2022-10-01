import { MysqlUserAccountRepository } from '@/infra/repos'

export const makeUserAccountRepository = (): MysqlUserAccountRepository => {
  return new MysqlUserAccountRepository()
}
