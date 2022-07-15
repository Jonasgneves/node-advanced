export interface UserRepository {
  loadUser: (params: UserRepository.Params) => Promise<UserRepository.Result>
}

export namespace UserRepository {
  export type Params = {
    user: string | undefined
    password: string | undefined
  }

  export type Result = undefined | {
    userId: string
  }
}
