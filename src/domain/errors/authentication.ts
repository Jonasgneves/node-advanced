export class AuthenticationError extends Error {
  constructor (error?: string) {
    super('Authentication failed')
    this.name = 'AuthenticationError'
    this.message = error ?? 'Falha ao autenticar!'
  }
}
