import { PrismaUsersRepository } from 'src/infra/database/prisma/prisma-users-repository'
import { BcryptHashRepository } from 'src/infra/cryptography/bcrypt/bcrypt-hash-repository'

import { RegisterUseCase } from '../use-cases/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const hashRepository = new BcryptHashRepository()

  const registerUseCase = new RegisterUseCase(usersRepository, hashRepository)

  return registerUseCase
}
