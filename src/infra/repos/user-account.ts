import { NotFoundError } from '@/application/errors'
import { UserRepository } from '@/domain/contracts/repos'
import { Login, Usuario } from '@/infra/repos/mysql/entities'
import { MysqlRepository } from '@/infra/repos/repository'

export class MysqlUserAccountRepository extends MysqlRepository implements UserRepository {
  async selectUser (ID_USUARIO: string): Promise<Usuario> {
    const user = await this.getRepository(Usuario).findOne({ where: { idUsuario: ID_USUARIO } })
    if (user !== null) return user
    throw new NotFoundError()
  }

  async saveUser (params: UserRepository.Input, hashPassword: string): Promise<UserRepository.Output> {
    const userRepo = this.getRepository(Usuario)
    const loginRepo = this.getRepository(Login)
    await this.openTransaction()
    try {
      const user = userRepo.create({
        idUsuario: params.ID_USUARIO,
        nome: params.NOME,
        dataNascimento: params.DATA_NASCIMENTO,
        cpf: params.CPF,
        matricula: params.MATRICULA
      })
      await this.queryManagerSave(user)
      const login = loginRepo.create({
        idLogin: params.ID_LOGIN,
        login: params.LOGIN,
        senha: hashPassword,
        idUsuario: params.ID_USUARIO
      })
      await this.queryManagerSave(login)
      await this.commit()
      return {
        ID_USUARIO: user.idUsuario,
        ID_LOGIN: login.idLogin,
        NOME: user.nome,
        CPF: user.cpf,
        DATA_NASCIMENTO: user.dataNascimento,
        MATRICULA: user.matricula,
        LOGIN: login.login,
        SENHA: login.senha
      }
    } catch (err) {
      console.log(err)
      await this.rollback()
    } finally {
      await this.closeTransaction()
    }
  }

  async loadUsers (pagination: number, quantity: number): Promise<{QUANTIDADE: number, USUARIOS: Usuario[]}> {
    const users = await this.getRepository(Usuario).query(`
      select * from USUARIO order by NOME asc LIMIT ${quantity} OFFSET ${pagination}
    `)
    const total = await this.getRepository(Usuario).count()

    return {
      QUANTIDADE: total,
      USUARIOS: users
    }
  }

  async loadUser (usuario: string): Promise<{login: string, senha: string, idUsuario: string}> {
    const findUserRepo = this.getRepository(Login)
    const user = await findUserRepo.findOneBy({ login: usuario })
    if (user !== null) {
      return {
        login: user.login,
        senha: user.senha,
        idUsuario: user.idUsuario
      }
    }
    throw new NotFoundError()
  }
}
