import { LoginController } from '@/application/controllers'
import { makeLoginAuthentication } from '@/main/factories/use-cases'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLoginAuthentication())
}
