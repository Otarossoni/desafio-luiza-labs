import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3140),
  HASH_SALT_LENGTH: z.coerce.number().default(8),
  JWT_SECRET: z.string(),
  DNS_SENTRY: z.string(),
  NEW_RELIC_API_URL: z.string(),
  NEW_RELIC_LICENSE_KEY: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string().nullable().optional(),
  VIA_CEP_API_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
