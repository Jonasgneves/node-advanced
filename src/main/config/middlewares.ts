import cors from 'cors'
import { Express, json } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(cors())
  app.use(json({ limit: '50mb' }))
  app.use((req, res, next) => {
    res.type('json')
    next()
  })
}
