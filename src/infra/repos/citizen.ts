// import { EnderecoCidadao, ContatoCidadao } from '@/application/controllers'
import { NotFoundError, ServerError } from '@/application/errors'
import { CitizenRepository } from '@/domain/contracts/repos'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'
import { MysqlRepository } from '@/infra/repos/repository'
// import {  } from 'typeorm'

export class MysqlCitizenRepository extends MysqlRepository implements CitizenRepository {
  async saveCitizen (params: CitizenRepository.Input): Promise<{ CIDADAO: Cidadao, ENDERECO: Endereco, CONTATO: Contato }> {
    const citizenRepo = this.getRepository(Cidadao)
    const addressRepo = this.getRepository(Endereco)
    const contactRepo = this.getRepository(Contato)
    await this.openTransaction()
    try {
      const address = addressRepo.create({
        idEndereco: params.ENDERECO.ID_ENDERECO,
        logradouro: params.ENDERECO.LOGRADOURO.toUpperCase(),
        numero: params.ENDERECO.NUMERO,
        complemento: params.ENDERECO.COMPLEMENTO,
        cep: params.ENDERECO.CEP,
        bairro: params.ENDERECO.BAIRRO.toUpperCase(),
        cidade: params.ENDERECO.CIDADE.toUpperCase(),
        uf: params.ENDERECO.UF.toUpperCase()
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
        nome: params.NOME.toUpperCase(),
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

  async selectCitizen (NOME?: string, RG?: string, CPF?: string): Promise<{ CIDADAO: Cidadao, ENDERECO: Endereco, CONTATO: Contato } | any[]> {
    const citizenRepo = this.getRepository(Cidadao)
    const addressRepo = this.getRepository(Endereco)
    const contactRepo = this.getRepository(Contato)
    if (NOME) {
      const citizenArr: any[] = []
      const citizenByNome = await citizenRepo.createQueryBuilder()
        .where(`NOME LIKE '%${NOME.toUpperCase()}%'`)
        .getMany()
      for (const citizens of citizenByNome) {
        const address = await addressRepo.findOneByOrFail({ idEndereco: citizens.idEndereco })
        const contact = await contactRepo.findOneByOrFail({ idContato: citizens.idContato })
        citizenArr.push({
          CIDADAO: citizens,
          ENDERECO: address,
          CONTATO: contact
        })
      }
      return citizenArr
    }
    const citizenByRgCpf = await citizenRepo.createQueryBuilder()
      .where(`${CPF ? `CPF = ${CPF}` : `RG = ${RG}`}`)
      .getOne()
    if (citizenByRgCpf !== null) {
      const address = await addressRepo.findOneByOrFail({ idEndereco: citizenByRgCpf.idEndereco })
      const contact = await contactRepo.findOneByOrFail({ idContato: citizenByRgCpf.idContato })
      return {
        CIDADAO: citizenByRgCpf,
        ENDERECO: address,
        CONTATO: contact
      }
    }
    throw new NotFoundError()
  }
}
