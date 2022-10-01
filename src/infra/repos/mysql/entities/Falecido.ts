import { Column, Entity } from 'typeorm'

@Entity('FALECIDO', { schema: 'wedsysco_necropolis' })
export class Falecido {
  @Column('varchar', { primary: true, name: 'ID_FALECIDO', length: 36 })
    idFalecido: string

  @Column('varchar', { name: 'NOME', nullable: true, length: 200 })
    nome: string | null

  @Column('int', { name: 'IDADE', nullable: true })
    idade: number | null

  @Column('varchar', { name: 'SEXO', nullable: true, length: 16 })
    sexo: string | null

  @Column('varchar', { name: 'PROFISSAO', nullable: true, length: 100 })
    profissao: string | null

  @Column('varchar', { name: 'ESTADO_CIVIL', nullable: true, length: 25 })
    estadoCivil: string | null

  @Column('varchar', { name: 'DATA_NASCIMENTO', nullable: true, length: 10 })
    dataNascimento: string | null
}
