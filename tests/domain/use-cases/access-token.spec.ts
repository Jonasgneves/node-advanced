import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should expire in 43200000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(43200000)
  })
})
