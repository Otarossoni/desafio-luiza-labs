export interface EncrypterRepository {
  encrypt(payload: Record<string, unknown>): Promise<string>
}
