import { Column, Entity, OneToMany } from 'typeorm'
import { Login } from './Login'

@Entity('USUARIO', { schema: 'wedsysco_necropolis' })
export class Usuario {
  @Column('varchar', { primary: true, name: 'ID_USUARIO', length: 36 })
    idUsuario: string

  @Column('varchar', { name: 'NOME', nullable: true, length: 200 })
    nome: string | null

  @Column('varchar', { name: 'CPF', nullable: true, length: 12 })
    cpf: string | null

  @Column('varchar', { name: 'DATA_NASCIMENTO', nullable: true, length: 10 })
    dataNascimento: string | null

  @Column('varchar', { name: 'MATRICULA', nullable: true, length: 45 })
    matricula: string | null

  @OneToMany(() => Login, (login) => login.idUsuario2)
    logins: Login[]
}
