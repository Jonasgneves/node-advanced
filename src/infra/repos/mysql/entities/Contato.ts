import { Column, Entity, OneToMany } from 'typeorm'
import { Cidadao } from './Cidadao'

@Entity('CONTATO', { schema: 'wedsysco_necropolis' })
export class Contato {
  @Column('varchar', { primary: true, name: 'ID_CONTATO', length: 36 })
    idContato: string

  @Column('varchar', { name: 'TELEFONE', nullable: true, length: 16 })
    telefone: string | null

  @Column('varchar', { name: 'CELULAR', nullable: true, length: 16 })
    celular: string | null

  @Column('varchar', { name: 'EMAIL', nullable: true, length: 200 })
    email: string | null

  @OneToMany(() => Cidadao, (cidadao) => cidadao.idContato2)
    cidadaos: Cidadao[]
}
