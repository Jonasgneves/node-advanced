import './config/module-alias'
import 'reflect-metadata'
import { MysqlConnection } from '@/infra/repos/mysql/helpers'

MysqlConnection.getInstance().connect()
  .then(async () => {
    const { app } = await import('@/main/config/app')
    app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
  })
  .catch(console.error)
