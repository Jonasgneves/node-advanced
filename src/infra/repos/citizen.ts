// import { EnderecoCidadao, ContatoCidadao } from '@/application/controllers'
import { ServerError } from '@/application/errors'
import { CitizenRepository } from '@/domain/contracts/repos'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'
import { MysqlRepository } from '@/infra/repos/repository'

export class MysqlCitizenRepository extends MysqlRepository implements CitizenRepository {
  async saveCitizen (params: CitizenRepository.Input): Promise<{ CIDADAO: Cidadao, ENDERECO: Endereco, CONTATO: Contato }> {
    const citizenRepo = this.getRepository(Cidadao)
    const addressRepo = this.getRepository(Endereco)
    const contactRepo = this.getRepository(Contato)
    await this.openTransaction()
    try {
      const address = addressRepo.create({
        idEndereco: params.ENDERECO.ID_ENDERECO,
        logradouro: params.ENDERECO.LOGRADOURO,
        numero: params.ENDERECO.NUMERO,
        complemento: params.ENDERECO.COMPLEMENTO,
        cep: params.ENDERECO.CEP,
        bairro: params.ENDERECO.BAIRRO,
        cidade: params.ENDERECO.CIDADE,
        uf: params.ENDERECO.UF
      })
      await this.queryManagerSave(address)
      const contact = contactRepo.create({
        idContato: params.CONTATO.ID_CONTATO,
        telefone: params.CONTATO.TELEFONE,
        celular: params.CONTATO.CELULAR,
        email: params.CONTATO.EMAIL
      })
      await this.queryManagerSave(contact)
      const citizen = citizenRepo.create({
        idCidadao: params.ID_CIDADAO,
        nome: params.NOME,
        cpf: params.CPF,
        rg: params.RG,
        idEndereco: params.ENDERECO.ID_ENDERECO,
        idContato: params.CONTATO.ID_CONTATO
      })
      await this.queryManagerSave(citizen)
      await this.commit()
      return {
        CIDADAO: citizen,
        CONTATO: contact,
        ENDERECO: address
      }
    } catch (error) {
      await this.rollback()
      throw new ServerError(error)
    } finally {
      await this.closeTransaction()
    }
  }
}
