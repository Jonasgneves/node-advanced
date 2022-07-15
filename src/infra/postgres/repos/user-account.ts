import { UserRepository } from '@/domain/contracts/repos'
import { getRepository } from 'typeorm'
import { User } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements UserRepository {
  async loadUser ({ user }: UserRepository.Params): Promise<UserRepository.Result> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ name: user })
    if (pgUser !== undefined) {
      return { userId: pgUser.id.toString() }
    }
  }
}
