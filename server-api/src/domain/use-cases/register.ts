import { Either, left, right } from 'src/core/errors/either'
import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

import { UsersRepository } from '../repositories/database/user-repository'
import { HashRepository } from '../repositories/cryptography/hash-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = Either<ResourceAlreadyExistsError, null>

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashRepository: HashRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new ResourceAlreadyExistsError('User'))
    }

    const hashedPassword = await this.hashRepository.generate(password)

    await this.usersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    })

    return right(null)
  }
}
