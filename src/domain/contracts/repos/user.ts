import { Usuario } from '@/infra/repos/mysql/entities'

export interface UserRepository {
  selectUser: (ID_USUARIO: string) => Promise<Usuario>
  loadUsers: (pagination: number, quantity: number) => Promise<{QUANTIDADE: number, USUARIOS: Usuario[]}>
  saveUser: (params: UserRepository.Input, hashPassword: string) => Promise<UserRepository.Output>
  loadUser: (usuario: string, senha: string) => Promise<{senha: string, login: string, idUsuario: string}>
}

export namespace UserRepository {
  export type Input = {
    ID_USUARIO: string
    ID_LOGIN: string
    NOME: string | null
    CPF: string | null
    DATA_NASCIMENTO: string | null
    MATRICULA: string | null
    LOGIN: string
    SENHA: string
  }

  export type Output = undefined | {
    ID_USUARIO: string
    ID_LOGIN: string
    NOME: string | null
    CPF: string | null
    DATA_NASCIMENTO: string | null
    MATRICULA: string | null
    LOGIN: string
    SENHA: string
  }
}
