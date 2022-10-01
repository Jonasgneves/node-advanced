import { Column, Entity } from 'typeorm'

@Entity('FUNERARIA', { schema: 'wedsysco_necropolis' })
export class Funeraria {
  @Column('varchar', { primary: true, name: 'ID_FUNERARIA', length: 36 })
    idFuneraria: string

  @Column('varchar', { name: 'NOME', nullable: true, length: 200 })
    nome: string | null

  @Column('varchar', { name: 'TELEFONE', nullable: true, length: 16 })
    telefone: string | null
}
