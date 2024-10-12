import { redis } from '../cache/connection'

export async function checkCacheAvailability(): Promise<string> {
  try {
    await redis.ping()
    return 'OK'
  } catch (err) {
    console.error(err)
    return 'NOT CONNECTED'
  }
}
