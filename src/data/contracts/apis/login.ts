export interface LoadUserLoginApi {
  loadUserLoginApi: (params: LoadUserLoginApi.Params) => Promise<LoadUserLoginApi.Result>
}

export namespace LoadUserLoginApi {
  export type Params = {
    user: string
    password: string
  }

  export type Result = undefined
}
