import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'usuarios' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number

  @Column({ name: 'nome', nullable: true })
    name!: string

  @Column()
    email!: string

  @Column({ name: 'senha' })
    password!: string
}
