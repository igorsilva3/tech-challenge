import { App } from '@app'
import { env } from '@env'

const app = new App().core

const host = env('SERVER_HOST') || 'localhost'
const port = env('SERVER_PORT') || 3000

interface ISettings {
  host?: string
  port?: number
}

export function start(settings?: ISettings) {
  const _host = settings?.host || host
  const _port = settings?.port || port

  app.listen(port, () =>
    console.log(`Server is running on http://${_host}:${_port}`),
  )
}