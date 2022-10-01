import { CryptoPassword, PasswordValidator } from '@/domain/contracts/gateways'

import { hashSync, compareSync } from 'bcryptjs'

export class BcryptPassword implements CryptoPassword, PasswordValidator {
  encrypt (password: string, salt: number): string {
    const hash = hashSync(password, salt)
    return hash
  }

  compare (password: string, passwordHash: string): Boolean {
    const match = compareSync(password, passwordHash)
    return match
  }
}
