import { env } from 'src/infra/env/variables'
import { EncrypterRepository } from '../../../domain/repositories/cryptography/encrypt-repository'

import jwt from 'jsonwebtoken'

export class JwtEncrypterRepository implements EncrypterRepository {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign({ payload }, env.JWT_SECRET, { expiresIn: '30m' })
  }
}
