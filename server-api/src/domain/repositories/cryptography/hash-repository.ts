export interface HashRepository {
  generate(plainText: string): Promise<string>
  compare(plainText: string, hash: string): Promise<boolean>
}
