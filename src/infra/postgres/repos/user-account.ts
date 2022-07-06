import { UserRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { User } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements UserRepository {
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
