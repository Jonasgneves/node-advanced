export class NotFound extends Error {
  constructor () {
    super('The server cannot find the requested resource')
    this.name = 'NotFoundError'
  }
}
