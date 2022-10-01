import { Controller } from '@/application/controllers'
import { HttpResponse, notFound, ok, serverError } from '@/application/helpers'
import { ValidationBuilder as Builder, Validator } from '@/application/validation'
import { SelectUser } from '@/domain/use-cases'
import { Usuario } from '@/infra/repos/mysql/entities'
import { NotFoundError } from '@/application/errors'

export type HttpRequest = {
  ID_USUARIO: string
}

type Output = { detail: string, user_message?: string } | Usuario

export class SelectUserController extends Controller {
  constructor (
    private readonly selectUser: SelectUser
  ) {
    super()
  }

  async perform ({ ID_USUARIO }: HttpRequest): Promise<HttpResponse<Output>> {
    try {
      const user = await this.selectUser(ID_USUARIO)
      return ok(user)
    } catch (error) {
      console.log(error)
      if (error instanceof NotFoundError) return notFound(error)
      return serverError(error)
    }
  }

  override buildValidators ({ ID_USUARIO }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: ID_USUARIO, fieldName: 'ID_USUARIO' }).required().build()

    ]
  }
}
