import { ForbiddenError, NotFoundError, ServerError, UnauthorizedError } from '@/application/errors'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const created = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 201,
  data
})

export const noContent = (data?: any): HttpResponse<void> => ({
  statusCode: 204,
  data
})

export const badRequest = (error: Error): HttpResponse<{ detail: string, user_message?: string}> => ({
  statusCode: 400,
  data: {
    detail: error.message,
    user_message: 'A requiseção não pode ser completada devido à sintaxe inválida'
  }
})

export const unauthorized = (error?: Error): HttpResponse<{ detail: string, user_message?: string }> => ({
  statusCode: 401,
  data: {
    detail: error?.message ?? new UnauthorizedError().message,
    user_message: new UnauthorizedError().message
  }
})

export const notFound = (error?: Error): HttpResponse<{ detail: string, user_message?: string}> => ({
  statusCode: 404,
  data: {
    detail: error?.message ?? new NotFoundError().message,
    user_message: new NotFoundError().message
  }
})

export const forbbiden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError()
})

export const serverError = (error: Error): HttpResponse<{ detail: string, user_message?: string}> => ({
  statusCode: 500,
  data: {
    detail: error.message,
    user_message: new ServerError().message
  }
})
