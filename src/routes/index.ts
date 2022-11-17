import { Router } from 'express'
import { userRouter } from '@routes/userRoutes'
import { authRouter } from '@routes/authRouter'

const routes = Router()

routes.use('/auth', authRouter)

routes.use('/users', userRouter)

export {
  routes
}