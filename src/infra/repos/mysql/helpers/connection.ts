import { appDataSource } from '@/data-source'
import { DbTransaction } from '@/application/contracts/db-transaction'
import { ConnectionNotFoundError, TransactionNotFoundError } from '@/infra/repos/mysql/helpers'

import { DeepPartial, ObjectLiteral, ObjectType, QueryRunner, Repository } from 'typeorm'

export class MysqlConnection implements DbTransaction {
  private static instance?: MysqlConnection
  private queryRunner: QueryRunner
  private constructor () {}

  static getInstance (): MysqlConnection {
    if (MysqlConnection.instance === undefined) MysqlConnection.instance = new MysqlConnection()
    return MysqlConnection.instance
  }

  async connect (): Promise<void> {
    if (appDataSource.isInitialized === undefined) throw new ConnectionNotFoundError()
    await appDataSource.initialize()
  }

  async disconnect (): Promise<void> {
    if (appDataSource.isInitialized === undefined) throw new ConnectionNotFoundError()
    await appDataSource.destroy()
  }

  async openTransaction (): Promise<void> {
    if (appDataSource === undefined) throw new TransactionNotFoundError()
    this.queryRunner = appDataSource.createQueryRunner()
    await this.queryRunner.connect()
    await this.queryRunner.startTransaction()
  }

  async queryManagerSave<Entity> (entity: DeepPartial<Entity>): Promise<void> {
    if (appDataSource.isInitialized === undefined) throw new ConnectionNotFoundError()
    if (this.queryRunner.isTransactionActive === undefined) throw new TransactionNotFoundError()
    await this.queryRunner.manager.save(entity)
  }

  async closeTransaction (): Promise<void> {
    if (appDataSource.isInitialized === undefined) throw new TransactionNotFoundError()
    if (this.queryRunner.isTransactionActive === undefined) throw new TransactionNotFoundError()
    await this.queryRunner.release()
    // await this.query.release()
  }

  async commit (): Promise<void> {
    if (appDataSource.isInitialized === undefined) throw new TransactionNotFoundError()
    if (this.queryRunner.isTransactionActive === undefined) throw new TransactionNotFoundError()
    await this.queryRunner.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (appDataSource.isInitialized === undefined) throw new TransactionNotFoundError()
    if (this.queryRunner.isTransactionActive === undefined) throw new TransactionNotFoundError()
    await this.queryRunner.rollbackTransaction()
  }

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    if (appDataSource.isInitialized === undefined) throw new TransactionNotFoundError()
    return appDataSource.manager.getRepository(entity)
  }
}
