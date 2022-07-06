import { UserRepository } from '@/data/contracts/repos'

import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm'
import { newDb } from 'pg-mem'

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
    it('should return an account if user exists', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [User]
      })
      await connection.synchronize()
      const pgUserRepo = getRepository(User)
      await pgUserRepo.save({ name: 'existing_user', email: 'jonas@mail.com', password: 'existing_password' })
      const sut = new PgUserAccountRepository()

      const account = await sut.loadUser({ user: 'existing_user', password: 'existing_password' })

      expect(account).toEqual({ userId: '1' })
      await connection.close()
    })

    it('should return undefined if user does not exists', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [User]
      })
      await connection.synchronize()
      const sut = new PgUserAccountRepository()

      const account = await sut.loadUser({ user: 'new_user', password: 'new_password' })

      expect(account).toBe(undefined)
      await connection.close()
    })
  })
})
