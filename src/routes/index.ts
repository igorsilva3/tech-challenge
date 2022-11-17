import { Router } from 'express'
import { userRouter } from '@routes/userRoutes'

const routes = Router()

routes.use('/users', userRouter)

export {
  routes
}