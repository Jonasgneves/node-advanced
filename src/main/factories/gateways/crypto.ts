import { BcryptPassword } from '@/infra/crypto'

export const makeBcryptPassword = (): BcryptPassword => {
  return new BcryptPassword()
}
