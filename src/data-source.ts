import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const appDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  synchronize: false,
  logging: false,
  entities: [
    process.env.NODE_ENV === 'dev' ? 'src/infra/repos/mysql/entities/*.ts' : 'dist/infra/repos/mysql/entities/*.js'
  ]
})
