import { UserRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/application/errors'
import { Usuario } from '@/infra/repos/mysql/entities'

type Setup = (userRepository: UserRepository) => LoadUsers
export type LoadUsers = (pagination: number, quantity: number) => Promise<{QUANTIDADE: number, USUARIOS: Usuario[]}>

export const setupLoadUsers: Setup = (userRepository) => async (pagination, quantity) => {
  const user = await userRepository.loadUsers(pagination, quantity)
  if (user !== undefined) return user
  throw new ServerError()
}
