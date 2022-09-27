export class ConnectionNotFoundError extends Error {
  constructor () {
    super('Não foi possível estabelecer uma conexão')
    this.name = 'ConnectionNotFoundError'
  }
}

export class TransactionNotFoundError extends Error {
  constructor () {
    super('Não foi possível realizar a transação')
    this.name = 'TransactionNotFoundError'
  }
}
