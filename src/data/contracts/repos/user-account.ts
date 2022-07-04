export interface LoadUserRepository {
  loadUser: (params: LoadUserRepository.Params) => Promise<LoadUserRepository.Result>
}

export namespace LoadUserRepository {
  export type Params = {
    user: string
    password: string
  }

  export type Result = {
    id: string
  } | undefined
}
