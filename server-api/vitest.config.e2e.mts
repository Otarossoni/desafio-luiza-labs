import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    environment: 'node',
    setupFiles: ['./test/setup-e2e.ts'],
  },
})
