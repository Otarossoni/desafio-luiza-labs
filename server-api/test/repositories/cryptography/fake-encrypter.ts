import { EncrypterRepository } from '../../../src/domain/repositories/cryptography/encrypt-repository'

export class FakeEncrypter implements EncrypterRepository {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
