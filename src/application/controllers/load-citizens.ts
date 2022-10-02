import { Controller } from '@/application/controllers'
import { HttpResponse, ok, serverError } from '@/application/helpers'
import { LoadCitizens } from '@/domain/use-cases'
import { Cidadao, Contato, Endereco } from '@/infra/repos/mysql/entities'

type Citizens = {
  CIDADAO: Cidadao
  ENDERECO: Endereco
  CONTATO: Contato
}

type Model = {
  QUANTIDADE: number
  CIDADAOS: Citizens[]
}

type HttpRequest = {
  page: number
  quantity: number
}

type Output = Model | { detail: string, user_message?: string }

export class LoadCitizenController extends Controller {
  constructor (
    private readonly loadCitizens: LoadCitizens
  ) {
    super()
  }

  async perform ({ page, quantity }: HttpRequest): Promise<HttpResponse<Output>> {
    if (!page) page = 0
    if (!quantity) quantity = 10
    if (quantity > 20) {
      quantity = 20
    }
    let pagination: number = 0;
    (page !== 0) && (pagination = page * quantity)
    try {
      const citizens = await this.loadCitizens(pagination, quantity)
      return ok(citizens)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
