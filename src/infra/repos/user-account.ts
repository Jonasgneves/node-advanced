import { UserRepository } from '@/domain/contracts/repos'
import { User } from '@/infra/repos/mysql/entities'
import { MysqlRepository } from '@/infra/repos/repository'

export class PgUserAccountRepository extends MysqlRepository implements UserRepository {
  async loadUser ({ user }: UserRepository.Params): Promise<UserRepository.Result> {
    const pgUser = await this.getRepository(User).findOneBy({ name: `${user}` })
    if (pgUser !== null) {
      return { userId: pgUser.id.toString() }
    }
  }
}
