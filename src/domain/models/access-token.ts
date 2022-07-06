export class AccessToken {
  constructor (readonly value: string) {}

  static get expirationInMs (): number {
    return 43200000
  }
}
