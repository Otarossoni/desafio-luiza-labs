import { EncrypterRepository } from '../../../domain/repositories/cryptography/encrypt-repository'

import { app } from '../../app'

export class JwtEncrypterRepository implements EncrypterRepository {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return app.jwt.sign({ payload })
  }
}
