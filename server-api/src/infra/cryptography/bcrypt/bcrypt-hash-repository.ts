import { hash, compare } from 'bcryptjs'

import { env } from 'src/infra/env/variables'

import { HashRepository } from '../../../domain/repositories/cryptography/hash-repository'

export class BcryptHashRepository implements HashRepository {
  private hashSaltLength = env.HASH_SALT_LENGTH

  async generate(plainText: string): Promise<string> {
    return hash(plainText, this.hashSaltLength)
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash)
  }
}
