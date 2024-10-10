import { describe, it, beforeEach, expect } from 'vitest'

import { RegisterUseCase } from './register'

import { FakeHashRepository } from '../../../test/repositories/cryptography/fake-hasher'
import { InMemoryUserRepository } from '../../../test/repositories/database/in-memory-user-repository'

import { ResourceAlreadyExistsError } from './errors/resource-already-exists-error'

let inMemoryUserRepository = new InMemoryUserRepository()
let fakeHashRepository = new FakeHashRepository()

let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHashRepository = new FakeHashRepository()

    sut = new RegisterUseCase(inMemoryUserRepository, fakeHashRepository)
  })

  it('should be able to register a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(null)
    expect(inMemoryUserRepository.items).toHaveLength(1)
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHashRepository.generate('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password_hash).toEqual(
      hashedPassword,
    )
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(result.value).instanceOf(ResourceAlreadyExistsError)
  })
})
