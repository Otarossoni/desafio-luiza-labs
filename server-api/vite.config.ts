import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    exclude: ['**/build/**', '**/node_modules/**'],
    coverage: {
      provider: 'v8',
      all: false,
    },
  },
})
