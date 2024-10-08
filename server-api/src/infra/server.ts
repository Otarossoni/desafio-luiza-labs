import { app } from './app'
import { env } from './env/variables'

const apiPort: number = env.PORT
const apiHost: string = '0.0.0.0'

app
  .listen({
    port: apiPort,
    host: apiHost,
  })
  .then(async () => {
    console.info(`HTTP server running on http://localhost:${apiPort}`)
  })
