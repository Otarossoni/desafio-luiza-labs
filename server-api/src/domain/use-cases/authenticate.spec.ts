import { randomUUID } from 'node:crypto'

import { describe, beforeEach, it, expect } from 'vitest'

import { AuthenticateUseCase } from './authenticate'

import { InMemoryUserRepository } from 'test/repositories/database/in-memory-user-repository'
import { FakeHashRepository } from 'test/repositories/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/repositories/cryptography/fake-encrypter'

import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHashRepository: FakeHashRepository
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHashRepository = new FakeHashRepository()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUseCase(
      inMemoryUserRepository,
      fakeHashRepository,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate', async () => {
    await inMemoryUserRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await fakeHashRepository.generate('123456'),
      created_at: new Date(),
    })

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(result.value).toEqual({
      access_token: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryUserRepository.items).toHaveLength(0)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUserRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await fakeHashRepository.generate('123456'),
      created_at: new Date(),
    })

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(result.isLeft()).toEqual(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
