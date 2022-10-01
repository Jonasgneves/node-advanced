export interface CryptoPassword {
  encrypt: (password: string, salt: number) => string
}

export interface PasswordValidator {
  compare: (password: string, password_hash: string) => Boolean
}
