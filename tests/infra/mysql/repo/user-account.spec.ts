import { UserRepository } from '@/data/contracts/repos'

import { Entity, PrimaryGeneratedColumn, Column, getRepository, Repository, getConnection } from 'typeorm'
import { IBackup, newDb } from 'pg-mem'

class PgUserAccountRepository implements UserRepository {
  async loadUser (params: UserRepository.Params): Promise<UserRepository.Result> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ name: params.user })
    if (pgUser !== undefined) {
      return {
        userId: pgUser.id.toString()
      }
    }
  }
}

@Entity({ name: 'usuarios' })
class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'senha' })
  password!: string
}

describe('PgUserAccountRepository', () => {
  describe('loadUser', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<User>
    let backup: IBackup

    beforeAll(async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [User]
      })
      await connection.synchronize()
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
