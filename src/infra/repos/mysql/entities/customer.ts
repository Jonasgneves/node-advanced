import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'cliente' })
export class Customer {
  @PrimaryGeneratedColumn()
    id!: number

  @Column()
    nome!: string

  @Column()
    cpf!: string

  @Column()
    identidade!: string

  @Column()
    orgao_emissor!: string

  @Column()
    grau_de_parentesco!: string

  @Column()
    telefone01!: string

  @Column()
    telefone02!: string

  @Column()
    endereco!: string

  @Column()
    numero!: string

  @Column()
    complemento!: string

  @Column()
    cep!: string

  @Column()
    bairro!: string

  @Column()
    cidade!: string

  @Column()
    uf!: string

  @Column()
    email!: string
}
