import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'
import { Endereco } from './Endereco'
import { Contato } from './Contato'

@Index('fk_CIDADAO_ENDERECO1_idx', ['idEndereco'], {})
@Index('fk_CIDADAO_TELEFONE1_idx', ['idContato'], {})
@Entity('CIDADAO', { schema: 'wedsysco_necropolis' })
export class Cidadao {
  @Column('varchar', { primary: true, name: 'ID_CIDADAO', length: 36 })
    idCidadao: string

  @Column('varchar', { name: 'NOME', nullable: true, length: 200 })
    nome: string | null

  @Column('varchar', { name: 'CPF', nullable: true, length: 12 })
    cpf: string | null

  @Column('varchar', { name: 'RG', nullable: true, length: 10 })
    rg: string | null

  @Column('varchar', { name: 'ID_ENDERECO', length: 36 })
    idEndereco: string

  @Column('varchar', { name: 'ID_CONTATO', length: 36 })
    idContato: string

  @ManyToOne(() => Endereco, (endereco) => endereco.cidadaos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'ID_ENDERECO', referencedColumnName: 'idEndereco' }])
    idEndereco2: Endereco

  @ManyToOne(() => Contato, (contato) => contato.cidadaos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn([{ name: 'ID_CONTATO', referencedColumnName: 'idContato' }])
    idContato2: Contato
}
