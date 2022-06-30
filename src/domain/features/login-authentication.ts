import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export interface LoginAuthentication {
  perform: (params: LoginAuthentication.Params) => Promise<LoginAuthentication.Result>
}

namespace LoginAuthentication {
  export type Params = {
    login: string
    senha: string
  }

  export type Result = AccessToken | AuthenticationError
}
