import { SelectUserController } from '@/application/controllers'
import { makeSelectUser } from '@/main/factories/use-cases'

export const makeSelectUserController = (): SelectUserController => {
  return new SelectUserController(makeSelectUser())
}
