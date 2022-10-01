import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('CARTORIO', { schema: 'wedsysco_necropolis' })
export class Cartorio {
  @PrimaryGeneratedColumn({ type: 'int', name: 'ID_CARTORIO' })
    idCartorio: number

  @Column('varchar', { name: 'NOME', nullable: true, length: 45 })
    nome: string | null
}
