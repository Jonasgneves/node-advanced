export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. try again soon')
    this.name = 'ServerError'
    this.stack = error?.message ?? 'Ocorreu um erro inesperado no servidor, Tente novamente mais tarde'
  }
}

export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    super(`Parâmetro invalido ${fieldName} é obrigatório`)
    this.name = 'RequiredFieldError'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
    this.message = 'Requisição não autorizada'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
    this.message = 'Você não tem permissão para executar esta ação!'
  }
}

export class NotFoundError extends Error {
  constructor (message?: string) {
    super('The requested resource was not found')
    this.name = 'NotFoundError'
    this.message = message ?? 'A busca não encontrou resultados'
  }
}
