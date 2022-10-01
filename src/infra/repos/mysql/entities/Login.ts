import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Usuario } from './Usuario'

@Index('fk_LOGIN_USUARIO1_idx', ['idUsuario'], {})
@Entity('LOGIN', { schema: 'wedsysco_necropolis' })
export class Login {
  @Column('varchar', { primary: true, name: 'ID_LOGIN', length: 36 })
    idLogin: string

  @Column('varchar', { name: 'SENHA', nullable: true, length: 45 })
    senha: string

  @Column('varchar', { name: 'LOGIN', nullable: true, length: 12 })
    login: string

  @Column('varchar', { name: 'ID_USUARIO', length: 36 })
    idUsuario: string

  @ManyToOne(() => Usuario, (usuario) => usuario.logins, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'ID_USUARIO', referencedColumnName: 'idUsuario' }])
    idUsuario2: Usuario
}
