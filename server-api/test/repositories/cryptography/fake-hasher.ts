import { HashRepository } from '../../../src/domain/repositories/cryptography/hash-repository'

export class FakeHashRepository implements HashRepository {
  async generate(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
