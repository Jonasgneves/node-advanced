import { MysqlCitizenRepository } from '@/infra/repos'

export const makeCitizenRepository = (): MysqlCitizenRepository => {
  return new MysqlCitizenRepository()
}
