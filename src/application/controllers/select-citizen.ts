import { Controller } from '@/application/controllers'
import { badRequest, HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { SelectCitizen } from '@/domain/use-cases'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'
import { NotFoundError } from '@/application/errors'

type Input = {
  nome?: string
  rg?: string
  cpf?: string
}

type Output = {
  CIDADAO: Cidadao
  ENDERECO: Endereco
  CONTATO: Contato
} | { detail: string, user_message?: string } | any[]

export class SelectCitizenController extends Controller {
  constructor (
    private readonly selectCitizen: SelectCitizen
  ) {
    super()
  }

  async perform ({ nome, rg, cpf }: Input): Promise<HttpResponse<Output>> {
    const error = new Error('A busca precisa ser feita com pelomenos um dos parâmetros NOME/RG/CPF')
    if (!nome && !rg && !cpf) return badRequest(error)
    try {
      const citizen = await this.selectCitizen(nome, rg, cpf)
      return ok(citizen)
    } catch (error) {
      console.log(error)
      if (error instanceof NotFoundError) return notFound(error)
      return serverError(error)
    }
  }
}
