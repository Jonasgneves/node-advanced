import { NotFound } from '@/domain/errors'
import { AccessToken } from '@/domain/models'

export interface LoginAuthentication {
  perform: (params: LoginAuthentication.Params) => Promise<LoginAuthentication.Result>
}

export namespace LoginAuthentication {
  export type Params = {
    user: string
    password: string
  }

  export type Result = AccessToken | NotFound
}
