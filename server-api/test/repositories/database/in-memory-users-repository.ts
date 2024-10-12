import { randomUUID } from 'node:crypto'

import { User } from '@prisma/client'

import { UsersRepository } from '../../../src/domain/repositories/database/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: User): Promise<User> {
    const newUser = {
      id: randomUUID(),
      ...data,
    }

    this.items.push(newUser)

    return newUser
  }
}
