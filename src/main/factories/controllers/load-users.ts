import { LoadUsersController } from '@/application/controllers'
import { makeLoadUser } from '@/main/factories/use-cases'

export const makeLoadUsersController = (): LoadUsersController => {
  return new LoadUsersController(makeLoadUser())
}
