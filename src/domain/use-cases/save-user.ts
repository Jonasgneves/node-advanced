import { UserRepository } from '@/domain/contracts/repos'
import { CryptoPassword } from '@/domain/contracts/gateways'
import { ServerError } from '@/application/errors'

export type Output = {
  ID_USUARIO: string
  ID_LOGIN: string
  NOME: string | null
  CPF: string | null
  DATA_NASCIMENTO: string | null
  MATRICULA: string | null
  LOGIN: string
  SENHA: string
}

export type Input = {
  ID_USUARIO: string
  ID_LOGIN: string
  NOME: string
  CPF: string
  DATA_NASCIMENTO: string
  MATRICULA: string
  LOGIN: string
  SENHA: string
}

type Setup = (userRepository: UserRepository, encrypt: CryptoPassword) => SaveUser
export type SaveUser = (params: Input) => Promise<Output>

export const setupSaveUser: Setup = (userRepository, encrypt) => async params => {
  const hashPassword = encrypt.encrypt(params.SENHA, 8)
  const savedUser = await userRepository.saveUser(params, hashPassword)
  if (savedUser !== undefined) return savedUser
  throw new ServerError()
}
