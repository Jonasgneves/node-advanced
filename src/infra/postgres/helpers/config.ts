import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '123',
  database: 'node_advanced',
  entities: [
    'dist/infra/postgres/entities/index.js'
  ]
}
