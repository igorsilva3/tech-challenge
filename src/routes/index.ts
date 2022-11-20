import { Router } from 'express'

import { userRouter } from '@routes/userRoutes'
import { authRouter } from '@routes/authRouter'
import { docsRouter } from '@routes/docsRouter'

const routes = Router()

routes.use('/auth', authRouter)
routes.use('/users', userRouter)
routes.use('/api-docs', docsRouter)

export {
  routes
}