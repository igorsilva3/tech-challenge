import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import { swaggerDoc } from '@docs'

const docsRouter = Router()

docsRouter.use('/', swaggerUi.serve)
docsRouter.get('/', swaggerUi.setup(swaggerDoc))

export { docsRouter }