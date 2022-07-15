import { LoginController } from '@/application/controllers'
import { makeLoginAuthenticationService } from '@/main/factories/services'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLoginAuthenticationService())
}
