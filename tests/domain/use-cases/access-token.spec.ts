import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should create with a value', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })

  it('should expire in 43200000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(43200000)
  })
})
