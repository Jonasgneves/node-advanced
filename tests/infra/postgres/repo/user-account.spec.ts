import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { User } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'

import { getRepository, Repository, getConnection } from 'typeorm'
import { IBackup } from 'pg-mem'

describe('PgUserAccountRepository', () => {
  describe('loadUser', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<User>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([User])
      backup = db.backup()
      pgUserRepo = getRepository(User)
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountRepository()
    })

    it('should return an account if user exists', async () => {
      await pgUserRepo.save({ name: 'any_user', email: 'jonas@mail.com', password: 'any_password' })

      const account = await sut.loadUser({ user: 'any_user', password: 'any_password' })

      expect(account).toEqual({ userId: '1' })
    })

    it('should return undefined if user does not exists', async () => {
      const account = await sut.loadUser({ user: 'any_user', password: 'any_password' })

      expect(account).toBeUndefined()
    })
  })
})
