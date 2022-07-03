export class AccessToken {
  constructor (private readonly value: string) {}

  static get expirationInMs (): number {
    return 43200000
  }
}
