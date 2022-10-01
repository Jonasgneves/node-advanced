import { SaveUserController } from '@/application/controllers'
import { makeSaveUser } from '@/main/factories/use-cases'

export const makeSaveUserController = (): SaveUserController => {
  return new SaveUserController(makeSaveUser())
}
