import { AuthenticationError } from '@/domain/errors'
import { UserRepository } from '@/domain/contracts/repos'
import { PasswordValidator, TokenGenerator } from '@/domain/contracts/gateways'
import { AccessToken } from '@/domain/entities'

type Setup = (userRepository: UserRepository, token: TokenGenerator, crypto: PasswordValidator) => LoginAuthentication
type Output = { accessToken: string }
export type LoginAuthentication = (usuario: string, senha: string) => Promise<Output>

export const setupLoginAuthentication: Setup = (userRepository, token, crypto) => async (usuario, senha) => {
  const accountUserId = await userRepository.loadUser(usuario, senha)
  const matchPassword = crypto.compare(senha, accountUserId.senha)
  if (matchPassword) {
    const accessToken = await token.generate({
      key: accountUserId.idUsuario,
      expirationInMs: AccessToken.expirationInMs
    })
    return { accessToken }
  }
  throw new AuthenticationError('Usuário ou senha inválidos')
}
