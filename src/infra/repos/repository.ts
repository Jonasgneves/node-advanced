import { MysqlConnection } from '@/infra/repos/mysql/helpers'

import { DeepPartial, Repository, ObjectType, ObjectLiteral } from 'typeorm'

export abstract class MysqlRepository {
  constructor (private readonly connection: MysqlConnection = MysqlConnection.getInstance()) {}

  async connect (): Promise<void> {
    await this.connection.connect()
  }

  async queryManagerSave<Entity> (entity: DeepPartial<Entity>): Promise<void> {
    await this.connection.queryManagerSave(entity)
  }

  async openTransaction (): Promise<void> {
    await this.connection.openTransaction()
  }

  async closeTransaction (): Promise<void> {
    await this.connection.closeTransaction()
  }

  async commit (): Promise<void> {
    await this.connection.commit()
  }

  async rollback (): Promise<void> {
    await this.connection.rollback()
  }

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
