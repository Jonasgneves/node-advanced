import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export interface LoginAuthentication {
  auth: (params: LoginAuthentication.Params) => Promise<LoginAuthentication.Result>
}

export namespace LoginAuthentication {
  export type Params = {
    user: string | undefined
    password: string | undefined
  }

  export type Result = AccessToken | AuthenticationError
}
