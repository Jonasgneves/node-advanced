import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'

import 'dotenv/config'
import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export { app }
