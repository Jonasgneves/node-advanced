import { Column, Entity, OneToMany } from 'typeorm'
import { Cidadao } from './Cidadao'

@Entity('ENDERECO', { schema: 'wedsysco_necropolis' })
export class Endereco {
  @Column('varchar', { primary: true, name: 'ID_ENDERECO', length: 36 })
    idEndereco: string

  @Column('varchar', { name: 'LOGRADOURO', nullable: true, length: 200 })
    logradouro: string | null

  @Column('varchar', { name: 'NUMERO', nullable: true, length: 8 })
    numero: string | null

  @Column('varchar', { name: 'COMPLEMENTO', nullable: true, length: 100 })
    complemento: string | null

  @Column('varchar', { name: 'CEP', nullable: true, length: 45 })
    cep: string | null

  @Column('varchar', { name: 'BAIRRO', nullable: true, length: 45 })
    bairro: string | null

  @Column('varchar', { name: 'CIDADE', nullable: true, length: 45 })
    cidade: string | null

  @Column('varchar', { name: 'UF', nullable: true, length: 2 })
    uf: string | null

  @OneToMany(() => Cidadao, (cidadao) => cidadao.idEndereco2)
    cidadaos: Cidadao[]
}
