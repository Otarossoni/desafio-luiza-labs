import { PrismaUsersRepository } from 'src/infra/database/prisma/prisma-users-repository'
import { BcryptHashRepository } from '../../infra/cryptography/bcrypt/bcrypt-hash-repository'
import { JwtEncrypterRepository } from '../../infra/cryptography/jwt/jwt-encrypt-repository'

import { AuthenticateUseCase } from '../use-cases/authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const hashRepository = new BcryptHashRepository()
  const encrypterRepository = new JwtEncrypterRepository()

  const authenticateUseCase = new AuthenticateUseCase(
    userRepository,
    hashRepository,
    encrypterRepository,
  )

  return authenticateUseCase
}
