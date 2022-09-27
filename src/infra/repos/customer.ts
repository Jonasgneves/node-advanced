import { SearchCustomer, SaveCustomer } from '@/domain/contracts/repos'
import { Customer } from '@/infra/repos/mysql/entities'
import { MysqlRepository } from '@/infra/repos/repository'

export class CustomerRepository extends MysqlRepository implements CustomerRepository {
  async load ({ cpf }: SearchCustomer.Input): Promise<SearchCustomer.Output> {
    const pgCustomerRepo = this.getRepository(Customer)
    const pgUser = await pgCustomerRepo.findOneBy({ cpf })
    if (pgUser !== null) {
      return pgUser
    }
  }

  async save (params: SaveCustomer.Input): Promise<SaveCustomer.Output> {
    const pgCustomerRepo = this.getRepository(Customer)
    const pgUser = await pgCustomerRepo.save({
      bairro: params.bairro,
      cep: params.cep,
      cidade: params.cidade,
      complemento: params.complemento,
      cpf: params.cpf,
      email: params.email,
      endereco: params.endereco,
      grau_de_parentesco: params.grau_de_parentesco,
      identidade: params.identidade,
      nome: params.nome,
      numero: params.numero,
      orgao_emissor: params.orgao_emissor,
      telefone01: params.telefone01,
      telefone02: params.telefone02,
      uf: params.uf
    })
    if (pgUser !== null) return pgUser
  }
}
