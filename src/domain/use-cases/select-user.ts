import { UserRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/application/errors'
import { Usuario } from '@/infra/repos/mysql/entities'

type Setup = (userRepository: UserRepository) => SelectUser
export type SelectUser = (ID_USUARIO: string) => Promise<Usuario>

export const setupSelectUser: Setup = (userRepository) => async ID_USUARIO => {
  const user = await userRepository.selectUser(ID_USUARIO)
  if (user !== undefined) return user
  throw new ServerError()
}
