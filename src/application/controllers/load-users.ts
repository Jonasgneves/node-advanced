import { Controller } from '@/application/controllers'
import { HttpResponse, ok, serverError } from '@/application/helpers'
import { LoadUsers } from '@/domain/use-cases'
import { Usuario } from '@/infra/repos/mysql/entities'

type Model = {
  QUANTIDADE: number
  USUARIOS: Usuario[]
}
type Output = { detail: string, user_message?: string } | Model
type HttpRequest = {
  page: number
  quantity: number
}

export class LoadUsersController extends Controller {
  constructor (
    private readonly loadUsers: LoadUsers
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
      const users = await this.loadUsers(pagination, quantity)
      return ok(users)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
